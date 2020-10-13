import fs from 'fs'
import PDFDocument from 'pdfkit'
import { parseQuestions } from './parseQuestions'
import config from './config'
import input from './input'

const documentHorizontalMargin: number = 48
const documentVerticalMargin: number = 64
const riseappsLogoWidth: number = 80
const riseappsLogoMargin: number = 24

const _generateInterviewPDF = (): void => {
    console.log('_generateInterviewPDF()')

    if (fs.existsSync(config.questionsFilepath)) {
        const pdfDocument = new PDFDocument({
            margins: {
                top: documentVerticalMargin,
                bottom: documentVerticalMargin,
                left: documentHorizontalMargin,
                right: documentHorizontalMargin,
            },
            info: {
                Author: config.pdfDocumentInfo.author,
                Creator: config.pdfDocumentInfo.creator,
                CreationDate: new Date(),
            },
        })

        pdfDocument.image(
            'assets/riseapps_logo.png',
            pdfDocument.page.width - riseappsLogoWidth - riseappsLogoMargin,
            riseappsLogoMargin,
            { width: riseappsLogoWidth },
        )

        pdfDocument
            .fontSize(18)
            .font('Times-Bold')
            .text(`Being interviewed - ${input.candidate.firstname} ${input.candidate.lastname}`)
            .moveDown(4)

        pdfDocument
            .image(config.pieChartFilepath, {
                width: pdfDocument.page.width - documentHorizontalMargin * 2,
                align: 'center',
                valign: 'center',
            })
            .moveDown(4)

        pdfDocument.fontSize(14).font('Times-Bold').text('Questions:')

        parseQuestions(fs.readFileSync(config.questionsFilepath, 'utf8'))
            .split('\n')
            .reduce(
                (curr, prev) =>
                    curr
                        .fontSize(14)
                        .font('Times-Roman')
                        .text(prev, {
                            align: 'justify',
                            continued: true,
                        })
                        .text('     ', { continued: true })
                        .font('Times-Bold')
                        .text(`Mark: `, { continued: true })
                        .font('Times-Bold')
                        .text(`    / ${config.maxMark}`, { underline: true }),
                pdfDocument.moveDown(1),
            )

        pdfDocument.pipe(fs.createWriteStream(config.forInterviewerFilepath))
        pdfDocument.end()
    }
}

export { _generateInterviewPDF }
