import moment from 'moment-timezone';
import PDFDocument from 'pdfkit';

import { config } from '../../config';
import { RISEAPPS_ADDRESS, RISEAPPS_EMAIL, RISEAPPS_PHONE } from '../config';

export const createPDFDocument = () => {
  const pdfDocument = new PDFDocument({
    margins: {
      top: config.pdfDocument.verticalMargin,
      bottom: config.pdfDocument.verticalMargin,
      left: config.pdfDocument.horizontalMargin,
      right: config.pdfDocument.horizontalMargin,
    },
    info: {
      Author: config.pdfDocument.author,
      Creator: config.pdfDocument.creator,
      CreationDate: new Date(),
    },
  });

  pdfDocument.registerFont(config.pdfDocument.regularFont, config.pdfDocument.regularFontPath);
  pdfDocument.registerFont(config.pdfDocument.boldFont, config.pdfDocument.boldFontPath);

  return pdfDocument;
};

export const drawHeader = (pdf: PDFKit.PDFDocument) => {
  pdf
    .image(
      config.pdfDocument.riseappsLogoPath,
      pdf.page.width - config.pdfDocument.logoWidth - config.pdfDocument.logoMargin,
      config.pdfDocument.logoMargin,
      { width: config.pdfDocument.logoWidth }
    )
    .moveDown(1)
    .font(config.pdfDocument.boldFont)
    .fontSize(config.pdfDocument.baseFontSize)
    .fillColor(config.pdfDocument.blackColor)
    .text(RISEAPPS_ADDRESS, { align: 'right' })
    .text(RISEAPPS_PHONE, { align: 'right' })
    .text(RISEAPPS_EMAIL, { align: 'right' });
};

const drawText = (pdf: PDFKit.PDFDocument, text: string, fontSize: number) => {
  pdf
    .font(config.pdfDocument.boldFont)
    .fontSize(fontSize)
    .fillColor(config.pdfDocument.brandColor)
    .text(text)
    .moveTo(pdf.x, pdf.y + config.pdfDocument.lineMargin)
    .lineTo(
      pdf.page.width - config.pdfDocument.horizontalMargin,
      pdf.y + config.pdfDocument.lineMargin
    )
    .stroke(config.pdfDocument.brandColor)
    .moveDown(1);
};

export const drawTitle = (pdf: PDFKit.PDFDocument, title: string) => {
  drawText(pdf, title, config.pdfDocument.biggerFontSize);
};

export const drawSubtitle = (pdf: PDFKit.PDFDocument, subtitle: string) => {
  drawText(pdf, subtitle, config.pdfDocument.baseFontSize);
};

export const drawTextWithIcon = (
  pdfDocument: PDFKit.PDFDocument,
  icon: string,
  text: string,
  isLink?: boolean
) => {
  pdfDocument
    .font(config.pdfDocument.boldFont)
    .fontSize(config.pdfDocument.baseFontSize)
    .fillColor(isLink ? config.pdfDocument.brandColor : config.pdfDocument.blackColor)
    .image(icon, { width: config.pdfDocument.iconWidth });

  const xBackup = pdfDocument.x;
  const yBackup = pdfDocument.y;

  pdfDocument.text(
    text,
    xBackup + config.pdfDocument.iconWidth * 1.5,
    yBackup - config.pdfDocument.iconWidth,
    isLink ? { link: text, underline: true } : undefined
  );

  // eslint-disable-next-line no-param-reassign
  pdfDocument.x = xBackup;
  // eslint-disable-next-line no-param-reassign
  pdfDocument.y = yBackup;
};

export const drawStep = (pdfDocument: PDFKit.PDFDocument, step: string) => {
  pdfDocument
    .moveDown(1)
    .font(config.pdfDocument.boldFont)
    .fontSize(config.pdfDocument.biggestFontSize)
    .fillColor(config.pdfDocument.brandColor)
    .text(step, { align: 'center' });
};

export const drawDate = (pdfDocument: PDFKit.PDFDocument) => {
  const format = 'DD.MM.yyyy';

  pdfDocument
    .moveDown(1)
    .font(config.pdfDocument.boldFont)
    .fontSize(config.pdfDocument.baseFontSize)
    .fillColor(config.pdfDocument.blackColor)
    .text(moment().format(format), { align: 'right', underline: true });
};
