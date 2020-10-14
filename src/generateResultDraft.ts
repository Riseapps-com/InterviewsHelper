import { parseQuestions } from './parseQuestions'
import fs from 'fs'
import config from './config'

const generateResultDraft = (): void => {
    console.log('generateResultDraft()')

    const questions = parseQuestions()
    const topics: string[] = []
    for (let key of questions.keys()) {
        topics.push(
            `${key} @topic@\n${questions
                .get(key)
                .map((question, index) => `${index + 1})`)
                .join('\n')}`,
        )
    }

    fs.writeFileSync(config.resultDraftFilepath, topics.join('\n'))
}

export { generateResultDraft }
