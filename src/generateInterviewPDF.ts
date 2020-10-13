import { Candidate } from './types'
import fs from 'fs'
import PDFDocument from 'pdfkit'
import { forInterviewerFilepath, pieChartFilepath, questionsFilepath } from './config'
import { parseQuestions } from './parseQuestions'

const generateInterviewPDF = (candidate: Candidate): void => {
    if (fs.existsSync(questionsFilepath)) {
        const pdfDocument = new PDFDocument({ margin: 64 })
        pdfDocument.fontSize(14)
        pdfDocument.font('Times-Roman')
        pdfDocument.image(pieChartFilepath, 0, 15, { width: 600 })
        pdfDocument.text(parseQuestions(fs.readFileSync(questionsFilepath, 'utf8')), {
            width: 410,
            align: 'justify',
        })
        pdfDocument.pipe(fs.createWriteStream(forInterviewerFilepath))
        pdfDocument.end()
    }
}

export { generateInterviewPDF }
