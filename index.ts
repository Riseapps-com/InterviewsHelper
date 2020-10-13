import includes from 'lodash.includes'
import { validateInterviewQuestions } from './src/validateInterviewQuestions'
import { findSuitableQuestions } from './src/findSuitableQuestions'
import { generateInterviewPDF } from './src/generateInterviewPDF'
import { generatePieChart } from './src/generatePieChart'
import { candidate, includedTopics, role } from './src/config'
import { createOutputsDirectory } from './src/createOutputsDirectory'

const findQuestionsArg = includes(process.argv, '--findQuestions')
const generatePDFArg = includes(process.argv, '--generatePDF')

const findQuestions = async (): Promise<void> => {
    console.log('findQuestions()')

    try {
        createOutputsDirectory()
        if (validateInterviewQuestions()) {
            await findSuitableQuestions(role, includedTopics)
            await generatePieChart(includedTopics)
        }
    } catch (error) {
        console.log(error)
    }
}

const generatePDF = async (): Promise<void> => {
    console.log('generatePDF()')

    try {
        generateInterviewPDF(candidate)
    } catch (error) {
        console.log(error)
    }
}

findQuestionsArg && findQuestions()
generatePDFArg && generatePDF()
