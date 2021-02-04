import fs from 'fs';

import { fsUtils, pdfUtils } from '../shared';
import { InterviewQuestions, QuestionData } from '../types';
import { config, input, interviewStructure } from '../wrappers';

export const parseQuestions = (
  interviewQuestions: InterviewQuestions
): Map<string, QuestionData[]> => {
  console.log(`parseQuestions()`);

  const parsedQuestions = new Map<string, QuestionData[]>();
  const rows: string[] = fs
    .readFileSync(fsUtils.wrapToOutputsDirectory(config.questionsFilename), 'utf8')
    .split('\n')
    .filter(row => row.includes(config.topicKey) || row.startsWith(config.suitableQuestionMarker));
  let currentTopic: string;

  rows.forEach(row => {
    if (row.includes(config.topicKey)) {
      const [, currentTopicInner] = row.split(`${config.topicKey}`);

      currentTopic = currentTopicInner;
    } else {
      const questionSplit: string[] = row.split(config.questionKey);
      const questionKey: string = questionSplit[1];
      let interviewQuestion: QuestionData | undefined;

      Object.values(interviewQuestions).forEach(question => {
        if (!interviewQuestion) {
          interviewQuestion = question.data.find(item => item.key === questionKey);
        }
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
  console.log(`generateResultDraft(${[...questions.keys()]})`);

  const topics: string[] = [];

  Array.of(...questions.keys()).forEach(key => {
    topics.push(
      `${config.topicKey}${key}${config.topicKey}\n${questions
        .get(key)
        ?.map((_, index) => `${index + 1})`)
        .join('\n')}`
    );
  });

  fs.writeFileSync(fsUtils.wrapToOutputsDirectory(config.resultDraftFilename), topics.join('\n'));
};

export const generateResultNotesDraft = (): void => {
  const { notesKey, recommendKey } = config;

  fs.writeFileSync(
    fsUtils.wrapToOutputsDirectory(config.resultNotesDraftFilename),
    `${notesKey}\n-\n${notesKey}\n\n${recommendKey}\nYes / No\n${recommendKey}`
  );
};

export const generateInterviewPDF = (questions: Map<string, QuestionData[]>): void => {
  console.log(`generateInterviewPDF(${[...questions.keys()]})`);

  const pdfDocument = pdfUtils.createPDFDocument();

  pdfUtils.drawRiseappsLogo(pdfDocument);

  pdfDocument
    .fontSize(16)
    .font(config.pdfDocument.regularFont)
    .text(`${input.candidate.firstname} ${input.candidate.lastname}`)
    .text(input.candidate.email)
    .text(input.candidate.phoneNumber)
    .text(`Supposed role - ${input.supposedRole}`)
    .moveDown(4);

  pdfDocument
    .image(fsUtils.wrapToOutputsDirectory(config.pieChartFilename), {
      width: pdfDocument.page.width - config.pdfDocument.horizontalMargin * 2,
      align: 'center',
      valign: 'center',
    })
    .moveDown(4);

  pdfDocument.fontSize(14).font(config.pdfDocument.boldFont).text('Evaluation');

  Object.keys(config.evaluation).forEach(key =>
    pdfDocument
      .fontSize(14)
      .font(config.pdfDocument.boldFont)
      .text(`${key} - `, { continued: true })
      .font(config.pdfDocument.regularFont)
      .text(config.evaluation[key])
  );

  pdfDocument.moveDown(1);

  pdfDocument.fontSize(14).font(config.pdfDocument.boldFont).text('Questions').moveDown(1);

  Array.of(...questions.keys()).reduce((prev, curr) => {
    prev
      .fontSize(14)
      .font(config.pdfDocument.boldFont)
      .text(
        `${curr} (${
          Object.values(interviewStructure.topics).find(topic => topic.label === curr)?.durationMin
        } min)`
      );

    const questionDate = questions.get(curr);

    if (questionDate) {
      return questionDate
        .reduce(
          (innerCurr, innerPrev, index) =>
            innerCurr
              .fontSize(14)
              .font(config.pdfDocument.regularFont)
              .text(`${index + 1}) ${innerPrev.question}`, {
                align: 'justify',
                continued: true,
              })
              .text('      ', { continued: true })
              .font(config.pdfDocument.boldFont)
              .text(`Mark: `, { continued: true })
              .font(config.pdfDocument.boldFont)
              .text(`    / ${config.maxMark}`, { underline: true }),
          prev
        )
        .moveDown(1);
    }

    return pdfDocument;
  }, pdfDocument);

  pdfDocument.pipe(
    fs.createWriteStream(fsUtils.wrapToOutputsDirectory(config.forInterviewerFilename))
  );
  pdfDocument.end();
};
