import PDFDocument from 'pdfkit';

import { config } from '../wrappers';

export const createPDFDocument = (): PDFKit.PDFDocument =>
  new PDFDocument({
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

export const drawRiseappsLogo = (pdfDocument: PDFKit.PDFDocument) =>
  pdfDocument.image(
    config.pdfDocument.riseappsLogoPath,
    pdfDocument.page.width - config.pdfDocument.logoWidth - config.pdfDocument.logoMargin,
    config.pdfDocument.logoMargin,
    { width: config.pdfDocument.logoWidth }
  );
