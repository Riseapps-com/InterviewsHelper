import fs from 'fs';

import { fsUtils, marksUtils, pdfUtils } from '../shared';
import { config, input } from '../wrappers';

export const parseResultDraft = (): Map<string, number[]> => {
  console.log(`parseResultDraft()`);

  const parsedResultDraft = new Map<string, number[]>();
  const rows: string[] = fs
    .readFileSync(fsUtils.wrapToOutputsDirectory(config.resultDraftFilename), 'utf8')
    .split('\n')
    .filter(row => row);
  let currentTopic: string;

  rows.forEach(row => {
    if (row.includes(config.topicKey)) {
      const [, currentTopicInner] = row.split(`${config.topicKey}`);

      currentTopic = currentTopicInner;
    } else {
      const mark = Number(row.split(') ')[1]);

      const currentTopicItem = parsedResultDraft.get(currentTopic);

      if (currentTopicItem) {
        parsedResultDraft.set(currentTopic, [...currentTopicItem, mark]);
      } else {
        parsedResultDraft.set(currentTopic, [mark]);
      }
    }
  });

  return parsedResultDraft;
};

export const parseResultNotesDraft = (): [string, string] => {
  console.log(`parseResultNotesDraft()`);

  const resultNotesDraft = fs.readFileSync(
    fsUtils.wrapToOutputsDirectory(config.resultNotesDraftFilename),
    'utf8'
  );
  const notes = resultNotesDraft.split(config.notesKey)[1].split('\n').join(' ').trim();
  const recommend = resultNotesDraft.split(config.recommendKey)[1].replace('\n', '');

  return [notes, recommend];
};

export const generateResultPDF = (
  resultDraft: Map<string, number[]>,
  resultNotesDraft: string[]
): void => {
  console.log(`generateResultPDF(${[...resultDraft.keys()]})`);

  const normalizedMarks = marksUtils.normalizeMarks([...resultDraft.values()]);

  const pdfDocument = pdfUtils.createPDFDocument();

  pdfUtils.drawRiseappsLogo(pdfDocument);

  pdfDocument.registerFont(
    config.pdfDocument.regularForeignFont,
    config.pdfDocument.foreignFontPath
  );

  pdfDocument
    .fontSize(18)
    .font(config.pdfDocument.boldFont)
    .text(`Result - ${input.candidate.firstname} ${input.candidate.lastname}`)
    .moveDown(4);

  pdfDocument
    .image(fsUtils.wrapToOutputsDirectory(config.radarChartFilename), {
      width: pdfDocument.page.width - config.pdfDocument.horizontalMargin * 2,
      align: 'center',
      valign: 'center',
    })
    .moveDown(4);

  pdfDocument.fontSize(14).font('Times-Bold').text('Topics:');
  Array.of(...resultDraft.keys()).reduce(
    (_, curr, index) =>
      pdfDocument
        .fontSize(14)
        .font(config.pdfDocument.boldFont)
        .text(`${curr}: `, { continued: true })
        .fontSize(14)
        .font(config.pdfDocument.boldFont)
        .text(`${normalizedMarks[index]} / 100`),
    pdfDocument
  );

  pdfDocument.moveDown(1);

  pdfDocument
    .fontSize(14)
    .font(config.pdfDocument.boldFont)
    .text('Notes:')
    .fontSize(12)
    .font(config.pdfDocument.regularForeignFont)
    .text(resultNotesDraft[0])
    .moveDown(1);

  pdfDocument
    .fontSize(14)
    .font(config.pdfDocument.boldFont)
    .text('Recommend: ', { continued: true })
    .fontSize(14)
    .font(config.pdfDocument.regularFont)
    .text(resultNotesDraft[1]);

  pdfDocument.pipe(fs.createWriteStream(fsUtils.wrapToOutputsDirectory(config.resultFilename)));
  pdfDocument.end();
};
