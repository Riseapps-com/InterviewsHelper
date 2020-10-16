import fs from 'fs'
import config from './wrappers/config'
import { wrapToOutputsDirectory } from './utils/createOutputsDirectory'

const generateResultNotesDraft = (): void => {
    fs.writeFileSync(
        wrapToOutputsDirectory(config.resultNotesDraftFilename),
        `${config.notesKey}\n-\n${config.notesKey}\n\n${config.recommendKey}\nYes / No\n${config.recommendKey}`,
    )
}

export { generateResultNotesDraft }
