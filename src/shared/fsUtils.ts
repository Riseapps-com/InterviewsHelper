import fs from 'fs';

import { input } from '../../config';

const firstName = input.candidate.firstname.toLowerCase();
const lastName = input.candidate.lastname.toLowerCase();

export const outputsDirectory = 'outputs';
export const outputDirectory = `${outputsDirectory}/output-${firstName}-${lastName}`;

export const createOutputsDirectory = () => {
  console.log('createOutputsDirectory()');

  if (!fs.existsSync(outputsDirectory)) {
    fs.mkdirSync(outputsDirectory);
  }
};

export const createOutputDirectory = () => {
  console.log('createOutputDirectory()');

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }
};

export const wrapToOutputDirectory = (filename: string) => {
  const wrapped = `${outputDirectory}/${filename}`;

  return wrapped;
};
