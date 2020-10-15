import { QuestionData } from './types'
import fs from 'fs'
import interviewQuestions from './interviewQuestions'
import config from './config'
import input from './input'
import { wrapToOutputsDirectory } from './createOutputsDirectory'

const isSuitableForTrainee = (requiredFor: string): boolean => requiredFor === 'trainee'

const isSuitableForJunior = (requiredFor: string): boolean =>
    requiredFor === 'trainee' || requiredFor === 'junior'

const isSuitableForJuniorPlus = (requiredFor: string): boolean =>
    requiredFor === 'trainee' || requiredFor === 'junior' || requiredFor === 'junior+'

const isSuitableForMiddleMinus = (requiredFor: string): boolean =>
    requiredFor === 'trainee' ||
    requiredFor === 'junior' ||
    requiredFor === 'junior+' ||
    requiredFor === 'middle-'

const isSuitableForMiddle = (requiredFor: string): boolean =>
    requiredFor === 'trainee' ||
    requiredFor === 'junior' ||
    requiredFor === 'junior+' ||
    requiredFor === 'middle-' ||
    requiredFor === 'middle'

const isSuitableForMiddlePlus = (requiredFor: string): boolean =>
    requiredFor === 'trainee' ||
    requiredFor === 'junior' ||
    requiredFor === 'junior+' ||
    requiredFor === 'middle-' ||
    requiredFor === 'middle' ||
    requiredFor === 'middle+'

const isSuitableForSenior = (requiredFor: string): boolean =>
    requiredFor === 'trainee' ||
    requiredFor === 'junior' ||
    requiredFor === 'junior+' ||
    requiredFor === 'middle-' ||
    requiredFor === 'middle' ||
    requiredFor === 'middle+' ||
    requiredFor === 'senior'

const isSuitableQuestion = (role: string, requiredFor: string): boolean => {
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

const formatQuestions = (questionsMap: Map<string, QuestionData[]>): string => {
    const topics: string[] = []
    questionsMap.forEach((value, key) => {
        const questions: string[] = value.map(
            (question) =>
                `${question.order}. ${question.question} (timeForAnswer: ${question.estimatedTimeMin} min) (requiredFor: ${question.requiredFor}) (key: @${question.key}@)`,
        )
        topics.push(`${key} ${config.topicKey}\n${questions.join('\n')}`)
    })
    return topics.join('\n')
}

const findSuitableQuestions = (): void => {
    console.log(`findSuitableQuestions()`)

    const questions: QuestionData[] = input.includedTopics.reduce((prev, curr) => {
        let suitableQuestions: QuestionData[]

        suitableQuestions = interviewQuestions[curr].data.filter((item: QuestionData) =>
            isSuitableQuestion(input.role, item.requiredFor),
        ) as QuestionData[]

        return [...prev, ...suitableQuestions]
    }, [])

    const questionsMap = new Map<string, QuestionData[]>()
    questions.forEach((question) => {
        if (questionsMap.get(question.topic)) {
            questionsMap.set(question.topic, [...questionsMap.get(question.topic), question])
        } else {
            questionsMap.set(question.topic, [question])
        }
    })

    fs.writeFileSync(
        wrapToOutputsDirectory(config.questionsFilename),
        formatQuestions(questionsMap),
    )
}

export { findSuitableQuestions }
