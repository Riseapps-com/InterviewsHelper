import { Topic, TopLevelTopic } from './config'

export type Status = 'optional' | 'required'

export type Role = 'trainee' | 'junior' | 'junior+' | 'middle-' | 'middle' | 'middle+' | 'senior'

export type Candidate = {
    firstname: string
    lastname: string
}

export type QuestionData = {
    order: number
    key: string
    estimatedTimeMin: number
    requiredFor: Role
    question: string
}

export type Question = {
    data: QuestionData[]
    links: string[]
}

export type InterviewQuestions = {
    [key in Topic]: Question
}

export type TopicDuration = {
    status: Status
    durationMin: number
    label: string
}

export type Topics = {
    [key in TopLevelTopic]: TopicDuration
}

export type Interview = {
    totalDurationMin: number
    topics: Topics
    requiredSections: string[]
    optionalSections: string[]
}
