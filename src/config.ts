import { Candidate, Role } from './types'

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
export type TopLevelTopic =
    | 'javascript'
    | 'typescript'
    | 'react'
    | 'reactNative'
    | 'nativePlatforms'
    | 'testing'
    | 'dataStructuresAndAlgorithms'
    | 'communicationSkills'
    | 'testTasks'
    | 'other'

const outputDirectory: string = 'outputs'

const notValidQuestionsFilepath: string = `${outputDirectory}/notValidQuestions.txt`
const questionsFilepath: string = `${outputDirectory}/questions.txt`
const pieChartFilepath: string = `${outputDirectory}/pieChart.png`
const forInterviewerFilepath: string = `${outputDirectory}/forInterviewer.pdf`
const forCandidateFilepath: string = `${outputDirectory}/forCandidate.pdf`
const resultDraftFilepath: string = `${outputDirectory}/resultDraft.txt`
const resultFilepath: string = `${outputDirectory}/result.pdf`
const suitableQuestionMarker: string = '+ '

// input args
const role: Role | null = 'trainee'
const includedTopics: Topic[] = [
    'javascript',
    'typescript',
    'react.redux',
    'react.hooks',
    'react.reactBasics',
]
const candidate: Candidate = {
    firstname: 'Dmitry',
    lastname: 'Usik',
}

export {
    outputDirectory,
    notValidQuestionsFilepath,
    questionsFilepath,
    pieChartFilepath,
    forInterviewerFilepath,
    forCandidateFilepath,
    resultDraftFilepath,
    resultFilepath,
    suitableQuestionMarker,
    role,
    includedTopics,
    candidate,
}
