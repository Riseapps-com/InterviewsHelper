import fs from 'fs'
import { outputDirectory } from './config'

const createOutputsDirectory = (): void => {
    console.log('createOutputsDirectory()')

    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory)
    }
}

export { createOutputsDirectory }
