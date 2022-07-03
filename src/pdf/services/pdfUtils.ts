import dayjs from 'dayjs';
import PDFDocument from 'pdfkit';

import { config } from '../../config';
import { RISEAPPS_ADDRESS, RISEAPPS_EMAIL, RISEAPPS_PHONE } from '../config';

export const createPDFDocument = (): PDFKit.PDFDocument => {
  const pdfDocument = new PDFDocument({
    margins: {
      top: config.pdfDocument.sizes.verticalMargin,
      bottom: config.pdfDocument.sizes.verticalMargin,
      left: config.pdfDocument.sizes.horizontalMargin,
      right: config.pdfDocument.sizes.horizontalMargin,
    },
    info: {
      Author: config.pdfDocument.author,
      Creator: config.pdfDocument.creator,
      CreationDate: new Date(),
    },
  });

  pdfDocument.registerFont(config.pdfDocument.fonts.regularFont, config.pdfDocument.fonts.regularFontPath);
  pdfDocument.registerFont(config.pdfDocument.fonts.boldFont, config.pdfDocument.fonts.boldFontPath);

  return pdfDocument;
};

export const drawHeader = (pdf: PDFKit.PDFDocument): void => {
  pdf
    .image(
      config.pdfDocument.icons.riseappsLogo,
      pdf.page.width - config.pdfDocument.sizes.logoWidth - config.pdfDocument.sizes.logoMargin,
      config.pdfDocument.sizes.logoMargin,
      { width: config.pdfDocument.sizes.logoWidth }
    )
    .moveDown(1)
    .font(config.pdfDocument.fonts.boldFont)
    .fontSize(config.pdfDocument.fonts.baseFontSize)
    .fillColor(config.pdfDocument.colors.blackColor)
    .text(RISEAPPS_ADDRESS, { align: 'right' })
    .text(RISEAPPS_PHONE, { align: 'right' })
    .text(RISEAPPS_EMAIL, { align: 'right' });
};

const drawText = (pdf: PDFKit.PDFDocument, text: string, fontSize: number): void => {
  pdf
    .font(config.pdfDocument.fonts.boldFont)
    .fontSize(fontSize)
    .fillColor(config.pdfDocument.colors.brandColor)
    .text(text)
    .moveTo(pdf.x, pdf.y + config.pdfDocument.sizes.lineMargin)
    .lineTo(pdf.page.width - config.pdfDocument.sizes.horizontalMargin, pdf.y + config.pdfDocument.sizes.lineMargin)
    .stroke(config.pdfDocument.colors.brandColor)
    .moveDown(1);
};

export const drawTitle = (pdf: PDFKit.PDFDocument, title: string): void => {
  drawText(pdf, title, config.pdfDocument.fonts.biggerFontSize);
};

export const drawSubtitle = (pdf: PDFKit.PDFDocument, subtitle: string): void => {
  drawText(pdf, subtitle, config.pdfDocument.fonts.baseFontSize);
};

export const drawTextWithIcon = (
  pdfDocument: PDFKit.PDFDocument,
  icons: string | string[],
  text: string,
  isLink?: boolean
): void => {
  pdfDocument
    .font(config.pdfDocument.fonts.boldFont)
    .fontSize(config.pdfDocument.fonts.baseFontSize)
    .fillColor(isLink ? config.pdfDocument.colors.brandColor : config.pdfDocument.colors.blackColor);

  if (Array.isArray(icons)) {
    icons.forEach(icon => pdfDocument.image(icon, { width: config.pdfDocument.sizes.iconWidth }));
  } else {
    pdfDocument.image(icons, { width: config.pdfDocument.sizes.iconWidth });
  }

  const xBackup = pdfDocument.x;
  const yBackup = pdfDocument.y;

  pdfDocument.text(
    text,
    xBackup + config.pdfDocument.sizes.iconWidth * 1.5,
    yBackup - config.pdfDocument.sizes.iconWidth,
    isLink ? { link: text, underline: true } : undefined
  );

  // eslint-disable-next-line no-param-reassign
  pdfDocument.x = xBackup;
  // eslint-disable-next-line no-param-reassign
  pdfDocument.y = yBackup;

  pdfDocument.moveDown(0.2);
};

export const drawStep = (pdfDocument: PDFKit.PDFDocument, step: string): void => {
  pdfDocument
    .moveDown(1)
    .font(config.pdfDocument.fonts.boldFont)
    .fontSize(config.pdfDocument.fonts.biggestFontSize)
    .fillColor(config.pdfDocument.colors.brandColor)
    .text(step, { align: 'center' });
};

export const drawDate = (pdfDocument: PDFKit.PDFDocument): void => {
  const format = 'DD.MM.YYYY';

  pdfDocument
    .moveDown(1)
    .font(config.pdfDocument.fonts.boldFont)
    .fontSize(config.pdfDocument.fonts.baseFontSize)
    .fillColor(config.pdfDocument.colors.blackColor)
    .text(dayjs().format(format), { align: 'right', underline: true });
};

export const drawNote = (pdfDocument: PDFKit.PDFDocument, note: string): void => {
  pdfDocument
    .moveDown(0.5)
    .font(config.pdfDocument.fonts.boldFont)
    .fontSize(config.pdfDocument.fonts.smallestFontSize)
    .fillColor(config.pdfDocument.colors.brandColor)
    .text(`* Note: ${note}`);
};
