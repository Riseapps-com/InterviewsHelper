import fs from 'fs';

import { inputUtils } from '../../input';
import { OUTPUTS_DIRECTORY } from '../config';

export const getOutputDirectory = (): string => {
  const firstName = inputUtils.getInput().candidate.firstname.toLowerCase();
  const lastName = inputUtils.getInput().candidate.lastname.toLowerCase();

  return `${OUTPUTS_DIRECTORY}/output-${firstName}-${lastName}`;
};

export const createOutputsDirectory = (): void => {
  console.log('createOutputsDirectory()');

  if (!fs.existsSync(OUTPUTS_DIRECTORY)) {
    fs.mkdirSync(OUTPUTS_DIRECTORY);
  }
};

export const createOutputDirectory = (): void => {
  console.log('createOutputDirectory()');

  if (!fs.existsSync(getOutputDirectory())) {
    fs.mkdirSync(getOutputDirectory());
  }
};

export const wrapToOutputDirectory = (filename: string): string => {
  return `${getOutputDirectory()}/${filename}`;
};
