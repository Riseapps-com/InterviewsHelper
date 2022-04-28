import fs from 'fs';

import { inputUtils } from '../../input';
import { OUTPUTS_DIRECTORY } from '../config';

export const getOutputDirectory = (): string => {
  const firstName = inputUtils.getInput().candidate.firstname.toLowerCase();
  const lastName = inputUtils.getInput().candidate.lastname.toLowerCase();

  return `${OUTPUTS_DIRECTORY}/output-${firstName}-${lastName}`;
};

export const wrapToOutputDirectory = (filename: string): string => {
  return `${getOutputDirectory()}/${filename}`;
};

export const createOutputsDirectory = (): void => {
  if (fs.existsSync(OUTPUTS_DIRECTORY)) return;

  fs.mkdirSync(OUTPUTS_DIRECTORY);
};

export const createOutputDirectory = (): void => {
  if (fs.existsSync(getOutputDirectory())) return;

  fs.mkdirSync(getOutputDirectory());
};
