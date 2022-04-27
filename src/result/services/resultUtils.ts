import fs from 'fs';

import { config } from '../../config';
import { fsUtils } from '../../fs';
import { inputUtils } from '../../input';
import { pdfUtils } from '../../pdf';

export const parseResultDraft = (): Map<string, number[]> => {
  console.log(`parseResultDraft()`);

  const parsedResultDraft = new Map<string, number[]>();
  const rows: string[] = fs
    .readFileSync(fsUtils.wrapToOutputDirectory(config.files.resultDraftFilename), 'utf8')
    .split('\n')
    .filter(row => row);
  let currentTopic: string;

  rows.forEach(row => {
    if (row.includes(config.parsers.topicKey)) {
      const [, currentTopicInner] = row.split(`${config.parsers.topicKey}`);

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

export const parseResultNotesDraft = (): string[] => {
  console.log(`parseResultNotesDraft()`);

  const resultNotesDraft = fs.readFileSync(
    fsUtils.wrapToOutputDirectory(config.files.resultNotesDraftFilename),
    'utf8'
  );
  const feedback = resultNotesDraft.split(config.parsers.feedbackKey)[1].split('\n').join(' ').trim();
  const decision = resultNotesDraft.split(config.parsers.decisionKey)[1].replace('\n', '');

  return [feedback, decision];
};

const drawCandidateInfo = (pdf: PDFKit.PDFDocument): void => {
  const candidateName = `${inputUtils.getInput().candidate.firstname} ${inputUtils.getInput().candidate.lastname}`;
  const candidateEmail = inputUtils.getInput().candidate.email || '-';

  pdf.moveDown(1);
  pdfUtils.drawTitle(pdf, candidateName);
  pdfUtils.drawTextWithIcon(pdf, config.pdfDocument.emailIconPath, candidateEmail);
};

const drawRadarChart = (pdf: PDFKit.PDFDocument): void => {
  const radarChartMargin =
    (pdf.page.width - config.pdfDocument.horizontalMargin * 2 - config.pdfDocument.radarChartWidth) / 2;

  pdf
    .moveDown(2)
    .image(fsUtils.wrapToOutputDirectory(config.files.radarChartFilename), pdf.x + radarChartMargin, pdf.y, {
      width: config.pdfDocument.radarChartWidth,
      align: 'center',
      valign: 'center',
    });
};

const drawFeedback = (pdf: PDFKit.PDFDocument, feedback: string): void => {
  pdf.moveDown(2);
  pdfUtils.drawTitle(pdf, 'Feedback');
  pdf
    .font(config.pdfDocument.regularFont)
    .fontSize(config.pdfDocument.baseFontSize)
    .fillColor(config.pdfDocument.blackColor)
    .text(feedback);
};

const drawDecision = (pdf: PDFKit.PDFDocument, decision: string): void => {
  pdf.moveDown(1);
  pdfUtils.drawTitle(pdf, 'Decision');
  pdf
    .font(config.pdfDocument.regularFont)
    .fontSize(config.pdfDocument.baseFontSize)
    .fillColor(config.pdfDocument.blackColor)
    .text(decision);
};

const drawInterviewerInfo = (pdf: PDFKit.PDFDocument): void => {
  const interviewerName = `${inputUtils.getInput().interviewer.firstname} ${
    inputUtils.getInput().interviewer.lastname
  }`;
  const interviewerEmail = inputUtils.getInput().interviewer.email || '-';
  const interviewerLinkedin = inputUtils.getInput().interviewer.linkedin || '-';

  pdf.moveDown(1);
  pdfUtils.drawTitle(pdf, 'Interviewer');
  pdfUtils.drawTextWithIcon(pdf, config.pdfDocument.userIconPath, interviewerName);
  pdfUtils.drawTextWithIcon(pdf, config.pdfDocument.emailIconPath, interviewerEmail);
  pdfUtils.drawTextWithIcon(pdf, config.pdfDocument.linkedinIconPath, interviewerLinkedin, true);
};

export const generateResultPDF = (resultNotesDraft: string[]): void => {
  console.log(`generateResultPDF(${resultNotesDraft})`);

  const pdfDocument = pdfUtils.createPDFDocument();

  pdfUtils.drawHeader(pdfDocument);
  pdfUtils.drawStep(pdfDocument, 'Result');
  drawCandidateInfo(pdfDocument);
  drawRadarChart(pdfDocument);
  drawFeedback(pdfDocument, resultNotesDraft[0]);
  drawDecision(pdfDocument, resultNotesDraft[1]);
  drawInterviewerInfo(pdfDocument);
  pdfUtils.drawDate(pdfDocument);

  pdfDocument.pipe(fs.createWriteStream(fsUtils.wrapToOutputDirectory(config.files.resultFilename)));
  pdfDocument.end();
};
