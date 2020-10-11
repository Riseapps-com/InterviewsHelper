import { Candidate, QuestionToValidate } from './types'
import fs, { constants } from 'fs'
import { questionsFilePath } from './findSuitableQuestions'
import interviewQuestions from './interview_questions.json'

const pdfFileName: string = 'interviewQuestions.pdf'

const parseQuestions = (rawQuestions: string): string => {
    const questions: string[] = rawQuestions
        .split('\n')
        .filter((question) => question.startsWith(''))
    const questionsForPDF: string[] = questions.reduce((prev, curr, index) => {
        const questionSplit: string[] = curr.split('@')
        const questionKey: string = questionSplit[questionSplit.length - 2]
        let interviewQuestion: QuestionToValidate = undefined
        if (questionKey.includes('js')) {
            interviewQuestion = interviewQuestions.javascript.data.find(
                (item) => item.key === questionKey,
            )
        } else if (questionKey.includes('ts')) {
            interviewQuestion = interviewQuestions.typescript.data.find(
                (item) => item.key === questionKey,
            )
        } else if (questionKey.includes('r:rb')) {
            interviewQuestion = interviewQuestions.react.reactBasics.find(
                (item) => item.key === questionKey,
            )
        } else if (questionKey.includes('r:r')) {
            interviewQuestion = interviewQuestions.react.redux.find(
                (item) => item.key === questionKey,
            )
        } else if (questionKey.includes('r:m')) {
            interviewQuestion = interviewQuestions.react.mobx.find(
                (item) => item.key === questionKey,
            )
        } else if (questionKey.includes('r:h')) {
            interviewQuestion = interviewQuestions.react.hooks.find(
                (item) => item.key === questionKey,
            )
        } else if (questionKey.includes('r:ra')) {
            interviewQuestion = interviewQuestions.react.reactAdvanced.find(
                (item) => item.key === questionKey,
            )
        } else if (questionKey.includes('r:ag')) {
            interviewQuestion = interviewQuestions.react.apolloGraphql.find(
                (item) => item.key === questionKey,
            )
        } else if (questionKey.includes('rn')) {
            interviewQuestion = interviewQuestions.reactNative.data.find(
                (item) => item.key === questionKey,
            )
        } else if (questionKey.includes('t:j')) {
            interviewQuestion = interviewQuestions.testing.jest.find(
                (item) => item.key === questionKey,
            )
        } else if (questionKey.includes('t:d')) {
            interviewQuestion = interviewQuestions.testing.detox.find(
                (item) => item.key === questionKey,
            )
        } else if (questionKey.includes('dsa')) {
            interviewQuestion = interviewQuestions.dataStructuresAndAlgorithms.data.find(
                (item) => item.key === questionKey,
            )
        } else if (questionKey.includes('cs')) {
            interviewQuestion = interviewQuestions.communicationSkills.data.find(
                (item) => item.key === questionKey,
            )
        } else if (questionKey.includes('tt')) {
            interviewQuestion = interviewQuestions.testTasks.data.find(
                (item) => item.key === questionKey,
            )
        } else if (questionKey.includes('o')) {
            interviewQuestion = interviewQuestions.other.data.find(
                (item) => item.key === questionKey,
            )
        }
        return [...prev, `${index + 1}) ${interviewQuestion?.question}`]
    }, [])

    return questionsForPDF.join('\n')
}

const generateInterviewPDF = (candidate: Candidate): void => {
    fs.access(questionsFilePath, constants.F_OK, (err) => {
        if (err) {
            console.error(err)
            return
        }
        fs.readFileSync(questionsFilePath, 'utf8')
    })
}

export { generateInterviewPDF }
