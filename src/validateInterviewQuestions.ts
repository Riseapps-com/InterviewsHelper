import { Key, QuestionToValidate } from './types'
import interviewQuestions from './interview_questions.json'
import fs, { constants } from 'fs'

const notValidQuestionsFilename: string = 'notValidQuestions.txt'

const validateGeneralQuestion = (generalQuestion: QuestionToValidate, index: number): boolean =>
    generalQuestion.order === index + 1 &&
    generalQuestion.estimatedTimeMin &&
    generalQuestion.question &&
    validateRequireFor(generalQuestion.requiredFor)

const validateRestQuestion = (
    restQuestion: QuestionToValidate,
    index: number,
    key: string,
): boolean =>
    validateGeneralQuestion(restQuestion, index) && restQuestion.key === `${key}${index + 1}`

const validateRequireFor = (requiredFor: string): boolean =>
    requiredFor === 'trainee' ||
    requiredFor === 'junior' ||
    requiredFor === 'junior+' ||
    requiredFor === 'middle-' ||
    requiredFor === 'middle' ||
    requiredFor === 'middle+' ||
    requiredFor === 'senior'

const validateQuestion = (
    typescriptQuestion: QuestionToValidate,
    index: number,
    key: string,
): boolean =>
    validateGeneralQuestion(typescriptQuestion, index) &&
    validateRestQuestion(typescriptQuestion, index, key)

const areQuestionsValid = (
    questions: QuestionToValidate[],
    validateFn: (question: QuestionToValidate, index: number, key: string) => boolean,
    topic: string,
    notValidQuestions: string[],
    key: Key,
): boolean =>
    questions.reduce((prev, curr, index) => {
        const isValid: boolean = validateFn(curr, index, key)
        if (!isValid) {
            notValidQuestions.push(`${topic}: ${index + 1}`)
        }
        return prev && isValid
    }, true)

const validateInterviewQuestions = (): boolean => {
    console.log('validateInterviewQuestions()')

    const notValidQuestions: string[] = []

    const isJavascriptValid = areQuestionsValid(
        interviewQuestions.javascript.data,
        validateQuestion,
        'javascript',
        notValidQuestions,
        'js',
    )
    const isTypescriptValid = areQuestionsValid(
        interviewQuestions.typescript.data,
        validateQuestion,
        'typescript',
        notValidQuestions,
        'ts',
    )
    const isReactBasicsValid = areQuestionsValid(
        interviewQuestions.react.reactBasics,
        validateQuestion,
        'reactBasics',
        notValidQuestions,
        'r:rb',
    )
    const isReduxValid = areQuestionsValid(
        interviewQuestions.react.redux,
        validateQuestion,
        'redux',
        notValidQuestions,
        'r:r',
    )
    const isMobxValid = areQuestionsValid(
        interviewQuestions.react.mobx,
        validateQuestion,
        'mobx',
        notValidQuestions,
        'r:m',
    )
    const isHooksValid = areQuestionsValid(
        interviewQuestions.react.hooks,
        validateQuestion,
        'hooks',
        notValidQuestions,
        'r:h',
    )
    const isReactAdvancedValid = areQuestionsValid(
        interviewQuestions.react.reactAdvanced,
        validateQuestion,
        'reactAdvanced',
        notValidQuestions,
        'r:ra',
    )
    const isApolloGraphqlValid = areQuestionsValid(
        interviewQuestions.react.apolloGraphql,
        validateQuestion,
        'apolloGraphql',
        notValidQuestions,
        'r:ag',
    )
    const isReactNativeValid = areQuestionsValid(
        interviewQuestions.reactNative.data,
        validateQuestion,
        'reactNative',
        notValidQuestions,
        'rn',
    )
    const isNativePlatformsValid = areQuestionsValid(
        interviewQuestions.nativePlatforms.data,
        validateQuestion,
        'nativePlatforms',
        notValidQuestions,
        'np',
    )
    const isJestValid = areQuestionsValid(
        interviewQuestions.testing.jest,
        validateQuestion,
        'jest',
        notValidQuestions,
        't:j',
    )
    const isDetoxValid = areQuestionsValid(
        interviewQuestions.testing.detox,
        validateQuestion,
        'detox',
        notValidQuestions,
        't:d',
    )
    const isDSAValid = areQuestionsValid(
        interviewQuestions.dataStructuresAndAlgorithms.data,
        validateQuestion,
        'dataStructuresAndAlgorithms',
        notValidQuestions,
        'dsa',
    )
    const isCommunicationSkillsValid = areQuestionsValid(
        interviewQuestions.communicationSkills.data,
        validateQuestion,
        'communicationSkills',
        notValidQuestions,
        'cs',
    )
    const isTestTasksValid = areQuestionsValid(
        interviewQuestions.testTasks.data,
        validateQuestion,
        'testTasks',
        notValidQuestions,
        'tt',
    )
    const isOtherValid = areQuestionsValid(
        interviewQuestions.other.data,
        validateQuestion,
        'other',
        notValidQuestions,
        'o',
    )

    writeNotValidQuestionsToFile(notValidQuestions)

    return (
        isJavascriptValid &&
        isTypescriptValid &&
        isReactBasicsValid &&
        isReduxValid &&
        isMobxValid &&
        isHooksValid &&
        isReactAdvancedValid &&
        isApolloGraphqlValid &&
        isReactNativeValid &&
        isNativePlatformsValid &&
        isJestValid &&
        isDetoxValid &&
        isDSAValid &&
        isCommunicationSkillsValid &&
        isTestTasksValid &&
        isOtherValid
    )
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
