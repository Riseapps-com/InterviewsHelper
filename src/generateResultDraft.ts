import fs from 'fs'
import config from './wrappers/config'
import { QuestionData } from './types'
import { wrapToOutputsDirectory } from './utils/createOutputsDirectory'

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

    fs.writeFileSync(wrapToOutputsDirectory(config.resultDraftFilename), topics.join('\n'))
}

export { generateResultDraft }
