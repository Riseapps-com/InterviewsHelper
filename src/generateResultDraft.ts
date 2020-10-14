import fs from 'fs'
import config from './config'
import { QuestionData } from './types'

const generateResultDraft = (questions: Map<string, QuestionData[]>): void => {
    console.log(`generateResultDraft(${[...questions.keys()]})`)

    const topics: string[] = []

    for (let key of questions.keys()) {
        topics.push(
            `${key} ${config.topicKey}\n${questions
                .get(key)
                .map((question, index) => `${index + 1})`)
                .join('\n')}`,
        )
    }

    fs.writeFileSync(config.resultDraftFilepath, topics.join('\n'))
}

export { generateResultDraft }
