import fs, { constants } from 'fs'
import { notValidQuestionsFilename } from './config'
import { QuestionData } from './types'
import startCase from 'lodash.startcase'
import interviewQuestions from './interviewQuestions'

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

const validateInterviewQuestions = (): boolean => {
    console.log('validateInterviewQuestions()')

    const notValidQuestions: string[] = []

    const isValid: boolean = Object.keys(interviewQuestions).reduce((prev, curr) => {
        let isValid: boolean

        if (Array.isArray(interviewQuestions[curr].data)) {
            isValid = areQuestionsValid(
                interviewQuestions[curr].data as QuestionData[],
                curr,
                notValidQuestions,
                topicToKey(curr),
            )
        } else {
            isValid = Object.keys(interviewQuestions[curr]).reduce(
                (prev, _curr) =>
                    curr !== 'links'
                        ? areQuestionsValid(
                              interviewQuestions[curr][_curr] as QuestionData[],
                              curr,
                              notValidQuestions,
                              topicToKey(curr),
                          )
                        : true,
                true,
            )
        }

        return isValid
    }, true)

    writeNotValidQuestionsToFile(notValidQuestions)

    return isValid
}

const writeNotValidQuestionsToFile = (notValidQuestions: string[]): void => {
    if (notValidQuestions.length) {
        fs.writeFileSync(notValidQuestionsFilename, notValidQuestions.join('\n'))
    } else {
        try {
            fs.accessSync(notValidQuestionsFilename, constants.F_OK)
            fs.unlinkSync(notValidQuestionsFilename)
        } catch (error) {
            console.log(error)
        }
    }
}

export { validateInterviewQuestions }
