import fs from 'fs';

import { QuestionData } from './types';
import { wrapToOutputsDirectory } from './utils/createOutputsDirectory';
import { drawRiseappsLogo, getPdfDocument } from './utils/pdfUtils';
import config from './wrappers/config';
import input from './wrappers/input';
// eslint-disable-next-line unused-imports/no-unused-imports-ts
import interview from './wrappers/interview';

const _generateInterviewPDF = (questions: Map<string, QuestionData[]>): void => {
  console.log(`_generateInterviewPDF(${[...questions.keys()]})`);

  const pdfDocument = getPdfDocument();

  drawRiseappsLogo(pdfDocument);

  pdfDocument
    .fontSize(18)
    .font('Times-Bold')
    .text(`Candidate - ${input.candidate.firstname} ${input.candidate.lastname} (${input.role})`)
    .moveDown(4);

  pdfDocument
    .image(wrapToOutputsDirectory(config.pieChartFilename), {
      width: pdfDocument.page.width - config.pdfDocument.horizontalMargin * 2,
      align: 'center',
      valign: 'center',
    })
    .moveDown(4);

  pdfDocument.fontSize(14).font('Times-Bold').text('Evaluation:');

  Object.keys(config.evaluation).forEach(key =>
    pdfDocument
      .fontSize(14)
      .font('Times-Bold')
      .text(`${key} - `, { continued: true })
      .font('Times-Roman')
      .text(config.evaluation[key])
  );

  pdfDocument.moveDown(1);

  pdfDocument.fontSize(14).font('Times-Bold').text('Questions:').moveDown(1);

  Array.of(...questions.keys()).reduce((prev, curr) => {
    prev
      .fontSize(14)
      .font('Times-Bold')
      .text(
        `${curr} (${
          Object.values(interview.topics).find(topic => topic.label === curr)?.durationMin
        } min):`
      );

    const questionDate = questions.get(curr);

    if (questionDate) {
      return questionDate
        .reduce(
          (innerCurr, innerPrev, index) =>
            innerCurr
              .fontSize(14)
              .font('Times-Roman')
              .text(`${index + 1}) ${innerPrev.question}`, {
                align: 'justify',
                continued: true,
              })
              .text('     ', { continued: true })
              .font('Times-Bold')
              .text(`Mark: `, { continued: true })
              .font('Times-Bold')
              .text(`    / ${config.maxMark}`, { underline: true }),
          prev
        )
        .moveDown(1);
    }

    return pdfDocument;
  }, pdfDocument);

  pdfDocument.pipe(fs.createWriteStream(wrapToOutputsDirectory(config.forInterviewerFilename)));
  pdfDocument.end();
};

export { _generateInterviewPDF };
