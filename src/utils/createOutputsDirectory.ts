import fs from 'fs';

import input from '../wrappers/input';

const firstName = input.candidate.firstname.toLowerCase();
const lastName = input.candidate.lastname.toLowerCase();

const outputsDirectory = `outputs-${firstName}-${lastName}`;

const createOutputsDirectory = (): void => {
  console.log('createOutputsDirectory()');

  if (!fs.existsSync(outputsDirectory)) {
    fs.mkdirSync(outputsDirectory);
  }
};

const wrapToOutputsDirectory = (filename: string): string => `${outputsDirectory}/${filename}`;

export { createOutputsDirectory, wrapToOutputsDirectory };
