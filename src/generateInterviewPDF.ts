import { Candidate, QuestionData } from './types'
import fs, { constants } from 'fs'
import PDFDocument from 'pdfkit'
import { questionsFilename } from './config'
import interviewQuestions from './interviewQuestions'

const pdfFileName: string = 'interviewQuestions.pdf'

const parseQuestions = (rawQuestions: string): string => {
    const questions: string[] = rawQuestions
        .split('\n')
        .filter((question) => question.startsWith(''))
    const questionsForPDF: string[] = questions.reduce((prev, curr, index) => {
        const questionSplit: string[] = curr.split('@')
        const questionKey: string = questionSplit[questionSplit.length - 2]
        let interviewQuestion: QuestionData = undefined

        // todo

        return [...prev, `${index + 1}) ${interviewQuestion?.question}`]
    }, [])

    return questionsForPDF.join('\n')
}

const generateInterviewPDF = (candidate: Candidate): void => {
    fs.access(questionsFilename, constants.F_OK, (err) => {
        if (err) {
            console.error(err)
            return
        }

        const pdfDocument = new PDFDocument({ margin: 64 })
        pdfDocument.fontSize(14);
        pdfDocument.font('Times-Roman')
        pdfDocument.image('pieChart.png', 0, 15, { width: 600 }).text('Proportional to width', 0, 0)
        pdfDocument.text(parseQuestions(fs.readFileSync(questionsFilename, 'utf8')), {
            width: 410,
            align: 'justify',
        })
        pdfDocument.pipe(fs.createWriteStream(pdfFileName))
        pdfDocument.end()
    })
}

export { generateInterviewPDF }
