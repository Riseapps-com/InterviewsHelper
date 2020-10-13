import { QuestionData } from './types'
import interviewQuestions from './interviewQuestions'
import config from './config'

const parseQuestions = (rawQuestions: string): string => {
    const questions: string[] = rawQuestions
        .split('\n')
        .filter((question) => question.startsWith(config.suitableQuestionMarker))
    const questionsForPDF: string[] = questions.reduce((prev, curr, index) => {
        const questionSplit: string[] = curr.split('@')
        const questionKey: string = questionSplit[questionSplit.length - 2]
        let interviewQuestion: QuestionData

        Object.values(interviewQuestions).forEach((question) => {
            if (!interviewQuestion) {
                interviewQuestion = question.data.find((item) => item.key === questionKey)
            }
        })

        return [...prev, `${index + 1}) ${interviewQuestion?.question}`]
    }, [])

    return questionsForPDF.join('\n')
}

export { parseQuestions }
