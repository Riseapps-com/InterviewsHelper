import fs from 'fs'
import config from './config'
import input from './input'
import { QuestionData } from './types'
import interview from './interview'
import { drawRiseappsLogo, getPdfDocument } from './pdfUtils'
import { wrapToOutputsDirectory } from './createOutputsDirectory'

const _generateInterviewPDF = (questions: Map<string, QuestionData[]>): void => {
    console.log(`_generateInterviewPDF(${[...questions.keys()]})`)

    const pdfDocument = getPdfDocument()

    drawRiseappsLogo(pdfDocument)

    pdfDocument
        .fontSize(18)
        .font('Times-Bold')
        .text(
            `Being interviewed - ${input.candidate.firstname} ${input.candidate.lastname} (${input.role})`,
        )
        .moveDown(4)

    pdfDocument
        .image(wrapToOutputsDirectory(config.pieChartFilename), {
            width: pdfDocument.page.width - config.pdfDocument.horizontalMargin * 2,
            align: 'center',
            valign: 'center',
        })
        .moveDown(4)

    pdfDocument.fontSize(14).font('Times-Bold').text('Questions:').moveDown(1)

    Array.of(...questions.keys()).reduce((prev, curr) => {
        prev.fontSize(14)
            .font('Times-Bold')
            .text(
                `${curr} (${
                    Object.values(interview.topics).find((topic) => topic.label === curr)
                        .durationMin
                } min)`,
            )
        return questions
            .get(curr)
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
                prev,
            )
            .moveDown(1)
    }, pdfDocument)

    pdfDocument.pipe(fs.createWriteStream(wrapToOutputsDirectory(config.forInterviewerFilename)))
    pdfDocument.end()
}

export { _generateInterviewPDF }
