import fs from 'fs';

import { config } from '../../config';
import { fsUtils } from '../../fs';
import { inputUtils } from '../../input';
import { pdfUtils } from '../../pdf';
import { interviewStructure } from '../config';

import type { InterviewQuestions, QuestionData } from '../../html';
import type { TopicDuration } from '../types';

export const calculateInterviewDuration = (topicDurations: TopicDuration[]): number => {
  return topicDurations.reduce((prev, curr) => prev + curr.durationMin, 0);
};

export const parseQuestions = (interviewQuestions: InterviewQuestions): Map<string, QuestionData[]> => {
  const parsedQuestions = new Map<string, QuestionData[]>();
  const rows: string[] = fs
    .readFileSync(fsUtils.wrapToOutputDirectory(config.files.questionsFilename), 'utf8')
    .split('\n')
    .filter(row => row.includes(config.parsers.topicKey) || row.startsWith(config.files.suitableQuestionMarker));
  let currentTopic: string;

  rows.forEach(row => {
    if (row.includes(config.parsers.topicKey)) {
      const [, currentTopicInner] = row.split(`${config.parsers.topicKey}`);

      currentTopic = currentTopicInner;
    } else {
      const questionSplit: string[] = row.split(config.parsers.questionKey);
      const questionKey: string = questionSplit[1];
      let interviewQuestion: QuestionData | undefined;

      Object.values(interviewQuestions).forEach(question => {
        if (interviewQuestion) return;

        interviewQuestion = question.data.find(item => item.key === questionKey);
      });

      const parsedQuestionsItem = parsedQuestions.get(currentTopic);

      if (interviewQuestion && parsedQuestionsItem) {
        parsedQuestions.set(currentTopic, [...parsedQuestionsItem, interviewQuestion]);
      } else if (interviewQuestion) {
        parsedQuestions.set(currentTopic, [interviewQuestion]);
      }
    }
  });

  return parsedQuestions;
};

export const generateResultDraft = (questions: Map<string, QuestionData[]>): void => {
  const topics: string[] = [];

  Array.of(...questions.keys()).forEach(key => {
    topics.push(
      `${config.parsers.topicKey}${key}${config.parsers.topicKey}\n${questions
        .get(key)
        ?.map((_, index) => `${index + 1})`)
        .join('\n')}`
    );
  });

  fs.writeFileSync(fsUtils.wrapToOutputDirectory(config.files.resultDraftFilename), topics.join('\n'));
};

export const generateResultNotesDraft = (): void => {
  const {
    parsers: { englishLevelKey, softwareSkillsKey, technicalSkillsKey, recommendKey, supposedLevelKey },
  } = config;

  fs.writeFileSync(
    fsUtils.wrapToOutputDirectory(config.files.resultNotesDraftFilename),
    `${englishLevelKey}\n-\n${englishLevelKey}`
      .concat(`\n\n${softwareSkillsKey}\n-\n${softwareSkillsKey}`)
      .concat(`\n\n${technicalSkillsKey}\n-\n${technicalSkillsKey}`)
      .concat(`\n\n${supposedLevelKey}\n-\n${supposedLevelKey}`)
      .concat(`\n\n${recommendKey}\nYes / No\n${recommendKey}`)
  );
};

const drawCandidateInfo = (pdf: PDFKit.PDFDocument): void => {
  const name = `${inputUtils.getInput().candidate.firstname} ${inputUtils.getInput().candidate.lastname}`;
  const { supposedLevel, email } = inputUtils.getInput().candidate;

  pdf.moveDown(1);
  pdfUtils.drawTitle(pdf, name);
  pdfUtils.drawTextWithIcon(pdf, config.pdfDocument.userIconPath, supposedLevel);
  pdfUtils.drawTextWithIcon(pdf, config.pdfDocument.emailIconPath, email);
};

const drawPieChart = (pdf: PDFKit.PDFDocument): void => {
  const pieChartMargin =
    (pdf.page.width - config.pdfDocument.horizontalMargin * 2 - config.pdfDocument.pieChartWidth) / 2;

  pdf.image(fsUtils.wrapToOutputDirectory(config.files.pieChartFilename), pdf.x + pieChartMargin, pdf.y, {
    width: config.pdfDocument.pieChartWidth,
    align: 'center',
    valign: 'center',
  });
};

const drawEvaluation = (pdf: PDFKit.PDFDocument): void => {
  pdf.moveDown(1);
  pdfUtils.drawTitle(pdf, 'Evaluation');
  pdf.fontSize(config.pdfDocument.baseFontSize).fillColor(config.pdfDocument.blackColor);
  Object.keys(config.evaluation.scale).forEach(key =>
    pdf
      .font(config.pdfDocument.boldFont)
      .text(`${key} - `, { continued: true })
      .font(config.pdfDocument.regularFont)
      .text(config.evaluation.scale[key])
  );
};

const drawQuestions = (pdf: PDFKit.PDFDocument, questions: Map<string, QuestionData[]>): void => {
  pdf.moveDown(1);
  pdfUtils.drawTitle(pdf, 'Questions');
  drawPieChart(pdf);

  Array.of(...questions.keys()).forEach(question => {
    const durationMin = Object.values(interviewStructure.topics).find(
      interviewTopic => interviewTopic.label === question
    )?.durationMin;
    const topic = `${question} (${durationMin} min)`;

    pdf.moveDown(1);
    pdfUtils.drawSubtitle(pdf, topic);

    const questionData = questions.get(question);

    if (!questionData) return;

    questionData.forEach((data, index) => {
      pdf
        .font(config.pdfDocument.regularFont)
        .fontSize(config.pdfDocument.baseFontSize)
        .fillColor(config.pdfDocument.blackColor)
        .text(`${index + 1}) ${data.question}`, {
          align: 'justify',
          continued: true,
        })
        .text('      ', { continued: true })
        .font(config.pdfDocument.boldFont)
        .text(`Mark: `, { continued: true })
        .text(`    / ${config.evaluation.maxMark}`, { underline: true });
    });
  });
};

export const generateInterviewPDF = (questions: Map<string, QuestionData[]>): void => {
  const pdfDocument = pdfUtils.createPDFDocument();

  pdfUtils.drawHeader(pdfDocument);
  pdfUtils.drawStep(pdfDocument, 'Interview');
  drawCandidateInfo(pdfDocument);
  drawEvaluation(pdfDocument);
  drawQuestions(pdfDocument, questions);
  pdfUtils.drawDate(pdfDocument);

  pdfDocument.pipe(fs.createWriteStream(fsUtils.wrapToOutputDirectory(config.files.forInterviewerFilename)));
  pdfDocument.end();
};
