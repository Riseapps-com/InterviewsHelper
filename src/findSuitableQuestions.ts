import { QuestionData, Role } from './types'
import fs from 'fs'
import { questionsFilename, Topic } from './config'
import interviewQuestions from './interviewQuestions'

const isSuitableForTrainee = (requiredFor: Role): boolean => requiredFor === 'trainee'

const isSuitableForJunior = (requiredFor: Role): boolean =>
    requiredFor === 'trainee' || requiredFor === 'junior'

const isSuitableForJuniorPlus = (requiredFor: Role): boolean =>
    requiredFor === 'trainee' || requiredFor === 'junior' || requiredFor === 'junior+'

const isSuitableForMiddleMinus = (requiredFor: Role): boolean =>
    requiredFor === 'trainee' ||
    requiredFor === 'junior' ||
    requiredFor === 'junior+' ||
    requiredFor === 'middle-'

const isSuitableForMiddle = (requiredFor: Role): boolean =>
    requiredFor === 'trainee' ||
    requiredFor === 'junior' ||
    requiredFor === 'junior+' ||
    requiredFor === 'middle-' ||
    requiredFor === 'middle'

const isSuitableForMiddlePlus = (requiredFor: Role): boolean =>
    requiredFor === 'trainee' ||
    requiredFor === 'junior' ||
    requiredFor === 'junior+' ||
    requiredFor === 'middle-' ||
    requiredFor === 'middle' ||
    requiredFor === 'middle+'

const isSuitableForSenior = (requiredFor: Role): boolean =>
    requiredFor === 'trainee' ||
    requiredFor === 'junior' ||
    requiredFor === 'junior+' ||
    requiredFor === 'middle-' ||
    requiredFor === 'middle' ||
    requiredFor === 'middle+' ||
    requiredFor === 'senior'

const isSuitableQuestion = (role: Role, requiredFor: Role): boolean => {
    let isSuitable: boolean = false
    switch (role) {
        case 'trainee':
            isSuitable = isSuitableForTrainee(requiredFor)
            break
        case 'junior':
            isSuitable = isSuitableForJunior(requiredFor)
            break
        case 'junior+':
            isSuitable = isSuitableForJuniorPlus(requiredFor)
            break
        case 'middle-':
            isSuitable = isSuitableForMiddleMinus(requiredFor)
            break
        case 'middle':
            isSuitable = isSuitableForMiddle(requiredFor)
            break
        case 'middle+':
            isSuitable = isSuitableForMiddlePlus(requiredFor)
            break
        case 'senior':
            isSuitable = isSuitableForSenior(requiredFor)
            break
    }
    return isSuitable
}

const formatQuestion = (question: QuestionData): string =>
    `${question.order}. ${question.question} (timeForAnswer: @${question.estimatedTimeMin}@ min) (requiredFor: @${question.requiredFor}@) (key: @${question.key}@)`

const findSuitableQuestions = (role: Role, includedTopics: Topic[]): void => {
    console.log(`findSuitableQuestions(${role}, [${includedTopics}])`)

    const questions: QuestionData[] = includedTopics.reduce((prev, curr) => {
        let suitableQuestions: QuestionData[]

        suitableQuestions = interviewQuestions[curr].data.filter((item: QuestionData) =>
            isSuitableQuestion(role, item.requiredFor),
        ) as QuestionData[]

        return [...prev, ...suitableQuestions]
    }, [])
    fs.writeFileSync(
        questionsFilename,
        questions.map((question) => formatQuestion(question)).join('\n'),
    )
}

export { findSuitableQuestions }
