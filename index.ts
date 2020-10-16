import includes from 'lodash.includes'
import { validateInterviewQuestions } from './src/validateInterviewQuestions'
import { findSuitableQuestions } from './src/findSuitableQuestions'
import { _generateInterviewPDF } from './src/generateInterviewPDF'
import { buildPieChart } from './src/charts/buildPieChart'
import { createOutputsDirectory } from './src/utils/createOutputsDirectory'
import { generateResultDraft } from './src/generateResultDraft'
import { _generateResultPDF } from './src/generateResultPDF'
import { buildRadarChart } from './src/charts/buildRadarChart'
import { parseQuestions } from './src/utils/parseQuestions'
import { parseResultDraft } from './src/utils/parseResultDraft'
import { generateResultNotesDraft } from './src/generateResultNotesDraft'
import { parseResultNotesDraft } from './src/utils/parseResultNotes'

const validateQuestionsDBArg = includes(process.argv, '--validateQuestionsDB')
const findQuestionsArg = includes(process.argv, '--findQuestions')
const generateInterviewPDFArg = includes(process.argv, '--generateInterviewPDF')
const generateResultPDFArg = includes(process.argv, '--generateResultPDF')

const validateQuestionsDB = (): void => {
    console.log('Executing validateQuestionsDB()...')
    if (!validateInterviewQuestions()) {
        console.log('Questions are not valid. See output/notValidQuestions.txt for more details.')
    }
}

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
        const parsedQuestions = parseQuestions()
        _generateInterviewPDF(parsedQuestions)
        generateResultDraft(parsedQuestions)
        generateResultNotesDraft()
    } catch (error) {
        console.log(error)
    }
}

const generateResultPDF = async (): Promise<void> => {
    console.log('Executing generateResultPDF()...')

    try {
        const parsedResultDraft = parseResultDraft()
        const parsedResultNotesDraft = parseResultNotesDraft()
        await buildRadarChart(parsedResultDraft)
        _generateResultPDF(parsedResultDraft, parsedResultNotesDraft)
    } catch (error) {}
}

validateQuestionsDBArg && validateQuestionsDB()
findQuestionsArg && findQuestions()
generateInterviewPDFArg && generateInterviewPDF()
generateResultPDFArg && generateResultPDF()
