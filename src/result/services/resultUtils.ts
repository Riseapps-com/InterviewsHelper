import fs from 'fs';

import { config } from '../../config';
import { fsUtils } from '../../fs';
import { inputUtils } from '../../input';
import { interviewStructure } from '../../interview';
import { pdfUtils } from '../../pdf';

import type { PdfIcons } from '../../config/types';

export const parseResultDraft = (): Map<string, number[]> => {
  const parsedResultDraft = new Map<string, number[]>();
  const rows = fs
    .readFileSync(fsUtils.wrapToOutputDirectory(config.files.result.resultDraftFilename), 'utf8')
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

const parseEnglishLevel = (resultNotesDraft: string): string => {
  const criteria = resultNotesDraft.split(config.parsers.englishLevelKey)[1].split('\n');

  return criteria.filter(item => !!item).join('\n');
};

export const parseResultNotesDraft = (): string[] => {
  const resultNotesDraft = fs.readFileSync(
    fsUtils.wrapToOutputDirectory(config.files.result.resultNotesDraftFilename),
    'utf8'
  );
  const englishLevel = parseEnglishLevel(resultNotesDraft);
  const softwareSkills = parseResultNote(resultNotesDraft, config.parsers.softwareSkillsKey);
  const technicalSkills = parseResultNote(resultNotesDraft, config.parsers.technicalSkillsKey);
  const supposedLevel = parseResultNote(resultNotesDraft, config.parsers.supposedLevelKey);
  const recommend = resultNotesDraft.split(config.parsers.recommendKey)[1].replace('\n', '');

  return [englishLevel, softwareSkills, technicalSkills, supposedLevel, recommend];
};

const drawInterviewInfo = (pdf: PDFKit.PDFDocument): void => {
  const input = inputUtils.getInput();
  const candidateName = `${input.candidate.firstname} ${input.candidate.lastname}`;
  const candidateEmail = input.candidate.email;

  pdf.moveDown(1);
  pdfUtils.drawTitle(pdf, candidateName);
  pdfUtils.drawTextWithIcon(
    pdf,
    inputUtils.parseInterviewType(input.interview.type).map(item => config.pdfDocument.icons[item as keyof PdfIcons]),
    input.interview.typeLabel || input.interview.type
  );
  pdfUtils.drawTextWithIcon(
    pdf,
    config.pdfDocument.icons.duration,
    `${interviewStructure[input.interview.mode].recommendedDuration} mins`
  );
  pdfUtils.drawTextWithIcon(
    pdf,
    config.pdfDocument.icons[input.interview.mode],
    input.interview.modeLabel || input.interview.mode
  );
  pdfUtils.drawTextWithIcon(pdf, config.pdfDocument.icons.email, candidateEmail);
};

const drawRadarChart = (pdf: PDFKit.PDFDocument): void => {
  const radarChartMargin =
    (pdf.page.width - config.pdfDocument.sizes.horizontalMargin * 2 - config.pdfDocument.sizes.radarChartWidth) / 2;

  pdf
    .moveDown(2)
    .image(fsUtils.wrapToOutputDirectory(config.files.result.radarChartFilename), pdf.x + radarChartMargin, pdf.y, {
      width: config.pdfDocument.sizes.radarChartWidth,
      align: 'center',
      valign: 'center',
    });
};

const drawSection = (pdf: PDFKit.PDFDocument, title: string, content: string, newLines = 1): void => {
  pdf.moveDown(newLines);
  pdfUtils.drawTitle(pdf, title);
  pdf
    .font(config.pdfDocument.fonts.regularFont)
    .fontSize(config.pdfDocument.fonts.baseFontSize)
    .fillColor(config.pdfDocument.colors.blackColor)
    .text(content);
};

const drawInterviewerInfo = (pdf: PDFKit.PDFDocument): void => {
  const name = `${inputUtils.getInput().interviewer.firstname} ${inputUtils.getInput().interviewer.lastname}`;
  const { email, linkedin } = inputUtils.getInput().interviewer;

  pdf.moveDown(1);
  pdfUtils.drawTitle(pdf, 'Interviewer');
  pdfUtils.drawTextWithIcon(pdf, config.pdfDocument.icons.user, name);
  pdfUtils.drawTextWithIcon(pdf, config.pdfDocument.icons.email, email);
  pdfUtils.drawTextWithIcon(pdf, config.pdfDocument.icons.linkedin, linkedin, true);
};

export const generateResultPDF = (resultNotesDraft: string[]): void => {
  const pdfDocument = pdfUtils.createPDFDocument();

  pdfUtils.drawHeader(pdfDocument);
  pdfUtils.drawStep(pdfDocument, 'Result');
  drawInterviewInfo(pdfDocument);
  drawRadarChart(pdfDocument);
  drawSection(pdfDocument, 'English level', resultNotesDraft[0], 2);
  drawSection(pdfDocument, 'Software skills', resultNotesDraft[1]);
  drawSection(pdfDocument, 'Technical skills', resultNotesDraft[2]);
  drawSection(pdfDocument, 'Supposed level', resultNotesDraft[3]);
  drawSection(pdfDocument, 'Recommend', resultNotesDraft[4]);
  drawInterviewerInfo(pdfDocument);
  pdfUtils.drawDate(pdfDocument);

  pdfDocument.pipe(fs.createWriteStream(fsUtils.wrapToOutputDirectory(config.files.result.resultFilename)));
  pdfDocument.end();
};
