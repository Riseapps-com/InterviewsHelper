import fs from 'fs';

import config from '../wrappers/config';
import { wrapToOutputsDirectory } from './createOutputsDirectory';

const parseResultNotesDraft = (): [string, string] => {
  console.log(`parseResultNotesDraft()`);

  const resultNotesDraft = fs.readFileSync(
    wrapToOutputsDirectory(config.resultNotesDraftFilename),
    'utf8'
  );
  const notes: string = resultNotesDraft.split(config.notesKey)[1].split('\n').join(' ').trim();
  const recommend: string = resultNotesDraft.split(config.recommendKey)[1].replace('\n', '');

  return [notes, recommend];
};

export { parseResultNotesDraft };
