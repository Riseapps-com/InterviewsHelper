import fs from 'fs'
import config from './config'
import { wrapToOutputsDirectory } from './createOutputsDirectory'

const generateResultNotesDraft = (): void => {
    fs.writeFileSync(
        wrapToOutputsDirectory(config.resultNotesDraftFilename),
        `${config.notesKey}\n-\n${config.notesKey}\n\n${config.recommendKey}\nYes / No\n${config.recommendKey}`,
    )
}

export { generateResultNotesDraft }
