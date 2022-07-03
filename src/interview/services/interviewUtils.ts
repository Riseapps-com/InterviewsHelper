import fs from 'fs';

import { config } from '../../config';
import { fsUtils } from '../../fs';
import { inputUtils } from '../../input';
import { pdfUtils } from '../../pdf';
import { questionsUtils } from '../../questions';
import { interviewStructure } from '../config';

import type { PdfIcons } from '../../config';
import type { InterviewQuestions, Question } from '../../html';

const parseLink = (question: string): string => {
  if (!question.includes('http')) return question;
  const questionSplit = question.split(' - ');

  return `${questionSplit[0]}\n${questionSplit[1]}`;
};

export const parseQuestions = (interviewQuestions: InterviewQuestions): Map<string, Question[]> => {
  const parsedQuestions = new Map<string, Question[]>();
  const rows: string[] = fs
    .readFileSync(fsUtils.wrapToOutputDirectory(config.files.interview.questionsFilename), 'utf8')
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
      let interviewQuestion: Question | undefined;

      Object.values(interviewQuestions).forEach(questions => {
        if (interviewQuestion) return;

        interviewQuestion = questions.find(item => item.key === questionKey);
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

export const generateResultDraft = (questions: Map<string, Question[]>): void => {
  const topics: string[] = [];

  Array.of(...questions.keys()).forEach(key => {
    topics.push(
      `${config.parsers.topicKey}${key}${config.parsers.topicKey}\n${questions
        .get(key)
        ?.map((_, index) => `${index + 1})`)
        .join('\n')}`
    );
  });

  fs.writeFileSync(fsUtils.wrapToOutputDirectory(config.files.result.resultDraftFilename), topics.join('\n'));
};

export const generateEnglishDraft = (): void => {
  const {
    parsers: { englishLevelKey },
  } = config;

  fs.writeFileSync(
    fsUtils.wrapToOutputDirectory(config.files.result.englishDraftFilename),
    `${englishLevelKey}\n`
      .concat(`${config.englishEvaluation.criteria.map(criteria => `${criteria}: 0/5`).join('\n')}`)
      .concat(`\n${englishLevelKey}`)
  );
};

export const generateResultNotesDraft = (): void => {
  const {
    parsers: { softwareSkillsKey, technicalSkillsKey, recommendKey, supposedLevelKey },
  } = config;

  fs.writeFileSync(
    fsUtils.wrapToOutputDirectory(config.files.result.resultNotesDraftFilename),
    `${softwareSkillsKey}\n-\n${softwareSkillsKey}`
      .concat(`\n\n${technicalSkillsKey}\n-\n${technicalSkillsKey}`)
      .concat(`\n\n${supposedLevelKey}\n-\n${supposedLevelKey}`)
      .concat(`\n\n${recommendKey}\nYes / No\n${recommendKey}`)
  );
};

const drawInterviewInfo = (pdf: PDFKit.PDFDocument): void => {
  const input = inputUtils.getInput();
  const name = `${input.candidate.firstname} ${input.candidate.lastname}`;
  const { supposedLevel, email } = input.candidate;

  pdf.moveDown(1);
  pdfUtils.drawTitle(pdf, name);
  pdfUtils.drawTextWithIcon(
    pdf,
    inputUtils.parseInterviewType(input.interview.type).map(item => config.pdfDocument.icons[item as keyof PdfIcons]),
    input.interview.typeLabel || input.interview.type
  );
  pdfUtils.drawTextWithIcon(
    pdf,
    config.pdfDocument.icons[input.interview.mode],
    input.interview.modeLabel || input.interview.mode
  );
  pdfUtils.drawTextWithIcon(
    pdf,
    config.pdfDocument.icons.duration,
    `${interviewStructure[input.interview.mode].recommendedDuration} mins`
  );
  pdfUtils.drawTextWithIcon(pdf, config.pdfDocument.icons.user, supposedLevel);
  pdfUtils.drawTextWithIcon(pdf, config.pdfDocument.icons.email, email);
};

const drawEvaluation = (pdf: PDFKit.PDFDocument): void => {
  pdf.moveDown(1);
  pdfUtils.drawTitle(pdf, 'Evaluation');
  pdf.fontSize(config.pdfDocument.fonts.baseFontSize).fillColor(config.pdfDocument.colors.blackColor);
  Object.keys(config.evaluation.scale).forEach(key =>
    pdf
      .font(config.pdfDocument.fonts.boldFont)
      .text(`${key} - `, { continued: true })
      .font(config.pdfDocument.fonts.regularFont)
      .text(config.evaluation.scale[key])
  );
};

const drawQuestions = (pdf: PDFKit.PDFDocument, questions: Map<string, Question[]>): void => {
  const input = inputUtils.getInput();

  pdf.moveDown(1);
  pdfUtils.drawTitle(pdf, 'Questions');

  Array.of(...questions.keys()).forEach(question => {
    const duration = questionsUtils.calculateTopicDuration(input, question, questions.get(question)?.length);
    const topic = `${question} (${duration} mins)`;

    pdf.moveDown(1);
    pdfUtils.drawSubtitle(pdf, topic);

    const questionData = questions.get(question);

    if (!questionData) return;

    questionData.forEach((data, index) => {
      pdf
        .font(config.pdfDocument.fonts.regularFont)
        .fontSize(config.pdfDocument.fonts.baseFontSize)
        .fillColor(config.pdfDocument.colors.blackColor)
        .text(`${index + 1}) ${parseLink(data.question)}`, {
          align: 'justify',
          continued: true,
        })
        .text('      ', { continued: true })
        .font(config.pdfDocument.fonts.boldFont)
        .text(`Mark: `, { continued: true })
        .text(`    / ${config.evaluation.maxMark}`, { underline: true });
    });
  });
};

const drawEnglish = (pdf: PDFKit.PDFDocument): void => {
  pdf.moveDown(1);
  pdfUtils.drawTitle(pdf, 'English');

  config.englishEvaluation.criteria.forEach(criteria =>
    pdf
      .font(config.pdfDocument.fonts.regularFont)
      .fontSize(config.pdfDocument.fonts.baseFontSize)
      .fillColor(config.pdfDocument.colors.blackColor)
      .text(`${criteria} ~`, { continued: true })
      .text('      ', { continued: true })
      .font(config.pdfDocument.fonts.boldFont)
      .text(`Mark: `, { continued: true })
      .text(`    / ${config.evaluation.maxMark}`, { underline: true })
  );
};

export const generateInterviewPDF = (questions: Map<string, Question[]>): void => {
  const pdfDocument = pdfUtils.createPDFDocument();

  pdfUtils.drawHeader(pdfDocument);
  pdfUtils.drawStep(pdfDocument, 'Interview');
  drawInterviewInfo(pdfDocument);
  drawEvaluation(pdfDocument);
  drawQuestions(pdfDocument, questions);
  drawEnglish(pdfDocument);
  pdfUtils.drawDate(pdfDocument);

  pdfDocument.pipe(fs.createWriteStream(fsUtils.wrapToOutputDirectory(config.files.interview.forInterviewerFilename)));
  pdfDocument.end();
};
