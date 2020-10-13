import fs from 'fs'
import config from '../config'

const createOutputsDirectory = (): void => {
    console.log('createOutputsDirectory()')

    if (!fs.existsSync(config.outputDirectory)) {
        fs.mkdirSync(config.outputDirectory)
    }
}

export { createOutputsDirectory }
