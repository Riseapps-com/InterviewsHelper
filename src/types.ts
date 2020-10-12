export type TopicDuration = {
    status: Status
    durationMin: number
    label: string
}

export type Status = 'optional' | 'required'

export type Role = 'trainee' | 'junior' | 'junior+' | 'middle-' | 'middle' | 'middle+' | 'senior'

export type QuestionData = {
    order: number
    key: string
    estimatedTimeMin: number
    requiredFor: Role
    question: string
}

export type Candidate = {
    firstname: string
    lastname: string
}
