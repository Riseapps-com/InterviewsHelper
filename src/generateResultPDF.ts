import config from './config'
import input from './input'
import fs from 'fs'
import { drawRiseappsLogo, getPdfDocument } from './pdfUtils'
import { wrapToOutputsDirectory } from './createOutputsDirectory'
import { marksToPercentageValues } from './marksToPercentageValues'

const _generateResultPDF = (
    resultDraft: Map<string, number[]>,
    resultNotesDraft: string[],
): void => {
    console.log(`_generateResultPDF(${[...resultDraft.keys()]})`)

    const percentageValues = marksToPercentageValues([...resultDraft.values()])

    const pdfDocument = getPdfDocument()

    drawRiseappsLogo(pdfDocument)

    pdfDocument.registerFont('NotoSans-Regular', 'assets/fonts/NotoSans-Regular.ttf')

    pdfDocument
        .fontSize(18)
        .font('Times-Bold')
        .text(`Result - ${input.candidate.firstname} ${input.candidate.lastname}`)
        .moveDown(4)

    pdfDocument
        .image(wrapToOutputsDirectory(config.radarChartFilename), {
            width: pdfDocument.page.width - config.pdfDocument.horizontalMargin * 2,
            align: 'center',
            valign: 'center',
        })
        .moveDown(4)

    pdfDocument.fontSize(14).font('Times-Bold').text('Topics:')
    Array.of(...resultDraft.keys()).reduce(
        (prev, curr, index) =>
            pdfDocument
                .fontSize(14)
                .font('Times-Roman')
                .text(`${curr}: `, { continued: true })
                .fontSize(14)
                .font('Times-Bold')
                .text(`${percentageValues[index]} / 100`),
        pdfDocument,
    )

    pdfDocument.moveDown(1)

    pdfDocument
        .fontSize(14)
        .font('Times-Bold')
        .text('Notes:')
        .fontSize(12)
        .font('NotoSans-Regular')
        .text(resultNotesDraft[0])
        .moveDown(1)

    pdfDocument
        .fontSize(14)
        .font('Times-Bold')
        .text('Recommend: ', { continued: true })
        .fontSize(14)
        .font('Times-Roman')
        .text(resultNotesDraft[1])

    pdfDocument.pipe(fs.createWriteStream(wrapToOutputsDirectory(config.resultFilename)))
    pdfDocument.end()
}

export { _generateResultPDF }
