import fs from 'fs';

import { config } from '../../config';
import { fsUtils } from '../../fs';
import { inputUtils } from '../../input';
import { pdfUtils } from '../../pdf';

export const parseResultDraft = (): Map<string, number[]> => {
  const parsedResultDraft = new Map<string, number[]>();
  const rows = fs
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

const parseResultNote = (resultNotesDraft: string, key: string): string => {
  return resultNotesDraft.split(key)[1].split('\n').join(' ').trim();
};

export const parseResultNotesDraft = (): string[] => {
  const resultNotesDraft = fs.readFileSync(
    fsUtils.wrapToOutputDirectory(config.files.resultNotesDraftFilename),
    'utf8'
  );
  const englishLevel = parseResultNote(resultNotesDraft, config.parsers.englishLevelKey);
  const softwareSkills = parseResultNote(resultNotesDraft, config.parsers.softwareSkillsKey);
  const technicalSkills = parseResultNote(resultNotesDraft, config.parsers.technicalSkillsKey);
  const supposedLevel = parseResultNote(resultNotesDraft, config.parsers.supposedLevelKey);
  const recommend = resultNotesDraft.split(config.parsers.recommendKey)[1].replace('\n', '');

  return [englishLevel, softwareSkills, technicalSkills, supposedLevel, recommend];
};

const drawCandidateInfo = (pdf: PDFKit.PDFDocument): void => {
  const candidateName = `${inputUtils.getInput().candidate.firstname} ${inputUtils.getInput().candidate.lastname}`;
  const candidateEmail = inputUtils.getInput().candidate.email;

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

const drawSection = (pdf: PDFKit.PDFDocument, title: string, content: string, newLines = 1): void => {
  pdf.moveDown(newLines);
  pdfUtils.drawTitle(pdf, title);
  pdf
    .font(config.pdfDocument.regularFont)
    .fontSize(config.pdfDocument.baseFontSize)
    .fillColor(config.pdfDocument.blackColor)
    .text(content);
};

const drawInterviewerInfo = (pdf: PDFKit.PDFDocument): void => {
  const name = `${inputUtils.getInput().interviewer.firstname} ${inputUtils.getInput().interviewer.lastname}`;
  const { email, linkedin } = inputUtils.getInput().interviewer;

  pdf.moveDown(1);
  pdfUtils.drawTitle(pdf, 'Interviewer');
  pdfUtils.drawTextWithIcon(pdf, config.pdfDocument.userIconPath, name);
  pdfUtils.drawTextWithIcon(pdf, config.pdfDocument.emailIconPath, email);
  pdfUtils.drawTextWithIcon(pdf, config.pdfDocument.linkedinIconPath, linkedin, true);
};

export const generateResultPDF = (resultNotesDraft: string[]): void => {
  const pdfDocument = pdfUtils.createPDFDocument();

  pdfUtils.drawHeader(pdfDocument);
  pdfUtils.drawStep(pdfDocument, 'Result');
  drawCandidateInfo(pdfDocument);
  drawRadarChart(pdfDocument);
  drawSection(pdfDocument, 'English level', resultNotesDraft[0], 2);
  drawSection(pdfDocument, 'Software skills', resultNotesDraft[1]);
  drawSection(pdfDocument, 'Technical skills', resultNotesDraft[2]);
  drawSection(pdfDocument, 'Supposed level', resultNotesDraft[3]);
  drawSection(pdfDocument, 'Recommend', resultNotesDraft[4]);
  drawInterviewerInfo(pdfDocument);
  pdfUtils.drawDate(pdfDocument);

  pdfDocument.pipe(fs.createWriteStream(fsUtils.wrapToOutputDirectory(config.files.resultFilename)));
  pdfDocument.end();
};
