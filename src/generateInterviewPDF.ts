import { Candidate } from './types'
import fs from 'fs'
import PDFDocument from 'pdfkit'
import { parseQuestions } from './parseQuestions'
import config from '../config'

const generateInterviewPDF = (candidate: Candidate): void => {
    if (fs.existsSync(config.questionsFilepath)) {
        const pdfDocument = new PDFDocument({ margin: 64 })
        pdfDocument.fontSize(14)
        pdfDocument.font('Times-Roman')
        pdfDocument.image(config.pieChartFilepath, 0, 15, { width: 600 })
        pdfDocument.text(parseQuestions(fs.readFileSync(config.questionsFilepath, 'utf8')), {
            width: 410,
            align: 'justify',
        })
        pdfDocument.pipe(fs.createWriteStream(config.forInterviewerFilepath))
        pdfDocument.end()
    }
}

export { generateInterviewPDF }
