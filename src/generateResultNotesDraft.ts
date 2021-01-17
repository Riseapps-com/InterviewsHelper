import fs from 'fs';

import { wrapToOutputsDirectory } from './utils/createOutputsDirectory';
import config from './wrappers/config';

const { notesKey, recommendKey } = config;

const generateResultNotesDraft = (): void => {
  fs.writeFileSync(
    wrapToOutputsDirectory(config.resultNotesDraftFilename),
    `${notesKey}\n-\n${notesKey}\n\n${recommendKey}\nYes / No\n${recommendKey}`
  );
};

export { generateResultNotesDraft };
