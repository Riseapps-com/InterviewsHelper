export type Role = 'trainee' | 'junior' | 'junior+' | 'middle-' | 'middle' | 'middle+' | 'senior'
export type Topic =
    | 'javascript'
    | 'typescript'
    | 'reactBasics'
    | 'redux'
    | 'mobx'
    | 'hooks'
    | 'reactAdvanced'
    | 'apolloGraphql'
    | 'reactNative'
    | 'nativePlatforms'
    | 'jest'
    | 'detox'
    | 'dataStructuresAndAlgorithms'
    | 'communicationSkills'
    | 'testTasks'
    | 'other'
export type Key =
    | 'js'
    | 'ts'
    | 'r:rb'
    | 'r:r'
    | 'r:m'
    | 'r:h'
    | 'r:ra'
    | 'r:ag'
    | 'rn'
    | 'np'
    | 't:j'
    | 't:d'
    | 'dsa'
    | 'cs'
    | 'tt'
    | 'o'

export type QuestionData = {
    order: number
    key: string
    estimatedTimeMin: number
    requiredFor: Role
    question: string
}

export type QuestionToValidate = Omit<QuestionData, 'requiredFor'> & { requiredFor: string }

export type Question = {
    data: QuestionData
    links: string[]
}

export type React = {
    reactBasics: QuestionData[]
    redux: QuestionData[]
    mobx: QuestionData[]
    hooks: QuestionData[]
    reactAdvanced: QuestionData[]
    apolloGraphql: QuestionData[]
    links: []
}

export type ReactNative = {}

export type Testing = {
    jest: QuestionData[]
    detox: QuestionData[]
    links: []
}

export type InterviewQuestions = {
    description: string
    javascript: Question
    typescript: Question
    react: React
    // reactNative: ReactNative
    reactNative: Question
    nativePlatforms: Question
    testing: Testing
    dataStructuresAndAlgorithms: Question
    communicationSkills: Question
    testTasks: Question
    other: Question
}

export type Status = 'optional' | 'required'

export type TopicDuration = {
    status: Status
    durationMin: number
    label: string
}

export type TopicDurationForChart = Omit<TopicDuration, 'status'> & { status: string }

export type Interview = {
    description: string
    javascript: TopicDuration
    typescript: TopicDuration
    react: TopicDuration
    reactNative: TopicDuration
    nativePlatforms: TopicDuration
    testing: TopicDuration
    dataStructuresAndAlgorithms: TopicDuration
    communicationSkills: TopicDuration
    testTasks: TopicDuration
    other: TopicDuration
    requiredSections: string[]
    optionalSections: string[]
}

export type Candidate = {
    firstname: string
    lastname: string
}
