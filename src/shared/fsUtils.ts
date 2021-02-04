import fs from 'fs';

import { input } from '../wrappers';

const firstName = input.candidate.firstname.toLowerCase();
const lastName = input.candidate.lastname.toLowerCase();

export const outputsDirectory = `outputs-${firstName}-${lastName}`;

export const createOutputsDirectory = (): void => {
  console.log('createOutputsDirectory()');

  if (!fs.existsSync(outputsDirectory)) {
    fs.mkdirSync(outputsDirectory);
  }
};

export const wrapToOutputsDirectory = (filename: string): string =>
  `${outputsDirectory}/${filename}`;
