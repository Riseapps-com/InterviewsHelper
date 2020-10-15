import { QuestionData } from './types'
import interviewQuestions from './interviewQuestions'
import config from './config'
import fs from 'fs'
import { wrapToOutputsDirectory } from './createOutputsDirectory'

const parseQuestions = (): Map<string, QuestionData[]> => {
    console.log(`parseQuestions()`)

    const parsedQuestions = new Map<string, QuestionData[]>()
    const rows: string[] = fs
        .readFileSync(wrapToOutputsDirectory(config.questionsFilename), 'utf8')
        .split('\n')
        .filter(
            (row) => row.includes(config.topicKey) || row.startsWith(config.suitableQuestionMarker),
        )
    let currentTopic: string

    rows.forEach((row) => {
        if (row.includes(config.topicKey)) {
            currentTopic = row.split(` ${config.topicKey}`)[0]
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
