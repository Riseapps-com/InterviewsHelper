import { QuestionData } from './types'
import interviewQuestions from './interviewQuestions'
import config from './config'
import fs from 'fs'

const parseQuestions = (): Map<string, QuestionData[]> => {
    const parsedQuestions = new Map<string, QuestionData[]>()

    const rows: string[] = fs
        .readFileSync(config.questionsFilepath, 'utf8')
        .split('\n')
        .filter((row) => row.includes('@topic@') || row.startsWith(config.suitableQuestionMarker))

    let currentTopic: string

    rows.forEach((row) => {
        if (row.includes('@topic@')) {
            currentTopic = row.split(' @topic@')[0]
        } else {
            const questionSplit: string[] = row.split('@')
            const questionKey: string = questionSplit[questionSplit.length - 2]
            let interviewQuestion: QuestionData

            Object.values(interviewQuestions).forEach((question) => {
                if (!interviewQuestion) {
                    interviewQuestion = question.data.find((item) => item.key === questionKey)
                }
            })

            if (interviewQuestion && parsedQuestions.get(currentTopic)) {
                parsedQuestions.set(currentTopic, [
                    ...parsedQuestions.get(currentTopic),
                    interviewQuestion,
                ])
            } else if (interviewQuestion) {
                parsedQuestions.set(currentTopic, [interviewQuestion])
            }
        }
    })

    return parsedQuestions
}

export { parseQuestions }
