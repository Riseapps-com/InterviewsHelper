import fs from 'fs'
import config from './config'
import { wrapToOutputsDirectory } from './createOutputsDirectory'

const parseResultDraft = (): Map<string, number[]> => {
    console.log(`parseResultDraft()`)

    const parsedResultDraft = new Map<string, number[]>()
    const rows: string[] = fs
        .readFileSync(wrapToOutputsDirectory(config.resultDraftFilename), 'utf8')
        .split('\n')
        .filter((row) => row)
    let currentTopic: string

    rows.forEach((row) => {
        if (row.includes(config.topicKey)) {
            currentTopic = row.split(` ${config.topicKey}`)[0]
        } else {
            const mark: number = Number(row.split(') ')[1])
            if (parsedResultDraft.get(currentTopic)) {
                parsedResultDraft.set(currentTopic, [...parsedResultDraft.get(currentTopic), mark])
            } else {
                parsedResultDraft.set(currentTopic, [mark])
            }
        }
    })

    return parsedResultDraft
}

export { parseResultDraft }
