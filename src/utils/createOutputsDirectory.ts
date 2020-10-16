import fs from 'fs'
import input from '../wrappers/input'

const outputsDirectory: string = `outputs-${input.candidate.firstname.toLowerCase()}-${input.candidate.lastname.toLowerCase()}`

const createOutputsDirectory = (): void => {
    console.log('createOutputsDirectory()')

    if (!fs.existsSync(outputsDirectory)) {
        fs.mkdirSync(outputsDirectory)
    }
}

const wrapToOutputsDirectory = (filename: string): string => `${outputsDirectory}/${filename}`

export { createOutputsDirectory, wrapToOutputsDirectory }
