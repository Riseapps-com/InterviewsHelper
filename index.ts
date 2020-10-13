import includes from 'lodash.includes'
import { validateInterviewQuestions } from './src/validateInterviewQuestions'
import { findSuitableQuestions } from './src/findSuitableQuestions'
import { _generateInterviewPDF } from './src/generateInterviewPDF'
import { buildPieChart } from './src/buildPieChart'
import { createOutputsDirectory } from './src/createOutputsDirectory'
import { generateResultDraft } from './src/generateResultDraft'
import { _generateResultPDF } from './src/generateResultPDF'
import { buildBarChart } from './src/buildBarChart'

const findQuestionsArg = includes(process.argv, '--findQuestions')
const generateInterviewPDFArg = includes(process.argv, '--generateInterviewPDF')
const generateResultPDFArg = includes(process.argv, '--generateResultPDF')

const findQuestions = async (): Promise<void> => {
    console.log('Executing findQuestions()...')

    try {
        createOutputsDirectory()
        if (validateInterviewQuestions()) {
            findSuitableQuestions()
            await buildPieChart()
        }
    } catch (error) {
        console.log(error)
    }
}

const generateInterviewPDF = async (): Promise<void> => {
    console.log('Executing generateInterviewPDF()...')

    try {
        _generateInterviewPDF()
        generateResultDraft()
    } catch (error) {
        console.log(error)
    }
}

const generateResultPDF = async (): Promise<void> => {
    console.log('Executing generateResultPDF()...')

    try {
        await buildBarChart()
        _generateResultPDF()
    } catch (error) {}
}

findQuestionsArg && findQuestions()
generateInterviewPDFArg && generateInterviewPDF()
generateResultPDFArg && generateResultPDF()
