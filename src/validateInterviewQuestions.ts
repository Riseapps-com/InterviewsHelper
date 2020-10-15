import fs from 'fs'
import { QuestionData } from './types'
import startCase from 'lodash.startcase'
import interviewQuestions from './interviewQuestions'
import config from './config'
import { wrapToOutputsDirectory } from './createOutputsDirectory'

const validateRequireFor = (requiredFor: string): boolean =>
    requiredFor === 'trainee' ||
    requiredFor === 'junior' ||
    requiredFor === 'junior+' ||
    requiredFor === 'middle-' ||
    requiredFor === 'middle' ||
    requiredFor === 'middle+' ||
    requiredFor === 'senior'

const validateQuestion = (question: QuestionData, index: number, key: string): boolean =>
    question.order === index + 1 &&
    question.estimatedTimeMin &&
    question.question &&
    question.key === `${key}${index + 1}` &&
    question.topic &&
    validateRequireFor(question.requiredFor)

const areQuestionsValid = (
    questions: QuestionData[],
    topic: string,
    notValidQuestions: string[],
    key: string,
): boolean =>
    questions.reduce((prev, curr, index) => {
        const isValid: boolean = validateQuestion(curr, index, key)
        if (!isValid) {
            notValidQuestions.push(`${topic}: ${index + 1}`)
        }
        return prev && isValid
    }, true)

const topicToKey = (topic: string): string =>
    startCase(topic)
        .split(' ')
        .map((word) => word[0].toLowerCase())
        .join('')

const saveNotValidQuestionsToFile = (notValidQuestions: string[]): void => {
    if (notValidQuestions.length) {
        fs.writeFileSync(
            wrapToOutputsDirectory(config.notValidQuestionsFilename),
            notValidQuestions.join('\n'),
        )
    } else {
        if (fs.existsSync(wrapToOutputsDirectory(config.notValidQuestionsFilename))) {
            fs.unlinkSync(wrapToOutputsDirectory(config.notValidQuestionsFilename))
        }
    }
}

const validateInterviewQuestions = (): boolean => {
    console.log('validateInterviewQuestions()')

    const notValidQuestions: string[] = []

    const isValid: boolean = Object.keys(interviewQuestions).reduce(
        (prev, curr: string) =>
            areQuestionsValid(
                interviewQuestions[curr].data,
                curr,
                notValidQuestions,
                topicToKey(curr),
            ),
        true,
    )

    saveNotValidQuestionsToFile(notValidQuestions)

    return isValid
}

export { validateInterviewQuestions }
