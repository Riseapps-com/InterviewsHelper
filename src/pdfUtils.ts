import PDFDocument from 'pdfkit'
import config from './config'

const getPdfDocument = (): PDFKit.PDFDocument =>
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
    })

const drawRiseappsLogo = (pdfDocument: PDFKit.PDFDocument) =>
    pdfDocument.image(
        'assets/images/riseapps_logo.png',
        pdfDocument.page.width - config.pdfDocument.logoWidth - config.pdfDocument.logoMargin,
        config.pdfDocument.logoMargin,
        { width: config.pdfDocument.logoWidth },
    )

export { getPdfDocument, drawRiseappsLogo }
