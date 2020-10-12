import includes from 'lodash.includes'
import { Candidate, Role } from './src/types'
import { validateInterviewQuestions } from './src/validateInterviewQuestions'
import { findSuitableQuestions } from './src/findSuitableQuestions'
import { generateInterviewPDF } from './src/generateInterviewPDF'
import { generatePieChart } from './src/generatePieChart'
import { Topic } from './src/config'

const findQuestionsArg = includes(process.argv, '--findQuestions')
const generatePDFArg = includes(process.argv, '--generatePDF')

const role: Role | null = 'trainee'
const includedTopics: Topic[] = ['javascript', 'typescript', 'react.redux', 'react.hooks', 'react.reactBasics']
const candidate: Candidate = {
    firstname: 'Dmitry',
    lastname: 'Usik',
}

const findQuestions = async (): Promise<void> => {
    console.log('findQuestions()')
    try {
        if (validateInterviewQuestions()) {
            await generatePieChart(includedTopics)
            await findSuitableQuestions(role, includedTopics)
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
