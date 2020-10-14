import fs from 'fs'
import PDFDocument from 'pdfkit'
import config from './config'
import input from './input'
import { QuestionData } from './types'

const riseappsLogoWidth: number = 80
const riseappsLogoMargin: number = 24

const _generateInterviewPDF = (questions: Map<string, QuestionData[]>): void => {
    console.log(`_generateInterviewPDF(${[...questions.keys()]})`)

    if (fs.existsSync(config.questionsFilepath)) {
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
            .text(
                `Being interviewed - ${input.candidate.firstname} ${input.candidate.lastname} (${input.role})`,
            )
            .moveDown(4)

        pdfDocument
            .image(config.pieChartFilepath, {
                width: pdfDocument.page.width - config.pdfDocument.horizontalMargin * 2,
                align: 'center',
                valign: 'center',
            })
            .moveDown(4)

        pdfDocument.fontSize(14).font('Times-Bold').text('Questions:').moveDown(1)

        for (let key of questions.keys()) {
            pdfDocument.fontSize(14).font('Times-Bold').text(key)
            questions
                .get(key)
                .reduce(
                    (curr, prev, index) =>
                        curr
                            .fontSize(14)
                            .font('Times-Roman')
                            .text(`${index + 1}) ${prev.question}`, {
                                align: 'justify',
                                continued: true,
                            })
                            .text('     ', { continued: true })
                            .font('Times-Bold')
                            .text(`Mark: `, { continued: true })
                            .font('Times-Bold')
                            .text(`    / ${config.maxMark}`, { underline: true }),
                    pdfDocument,
                )
                .moveDown(1)
        }

        pdfDocument.pipe(fs.createWriteStream(config.forInterviewerFilepath))
        pdfDocument.end()
    }
}

export { _generateInterviewPDF }
