export type Topic =
    | 'javascript'
    | 'typescript'
    | 'react.reactBasics'
    | 'react.redux'
    | 'react.mobx'
    | 'react.hooks'
    | 'react.reactAdvanced'
    | 'react.apolloGraphql'
    | 'reactNative'
    | 'nativePlatforms'
    | 'testing.jest'
    | 'testing.detox'
    | 'dataStructuresAndAlgorithms'
    | 'communicationSkills'
    | 'testTasks'
    | 'other'

const notValidQuestionsFilename: string = 'notValidQuestions.txt'
const questionsFilename: string = 'questions.txt'

export { notValidQuestionsFilename, questionsFilename }
