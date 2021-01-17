import fs from 'fs';

import config from '../wrappers/config';
import { wrapToOutputsDirectory } from './createOutputsDirectory';

const parseResultDraft = (): Map<string, number[]> => {
  console.log(`parseResultDraft()`);

  const parsedResultDraft = new Map<string, number[]>();
  const rows: string[] = fs
    .readFileSync(wrapToOutputsDirectory(config.resultDraftFilename), 'utf8')
    .split('\n')
    .filter(row => row);
  let currentTopic: string;

  rows.forEach(row => {
    if (row.includes(config.topicKey)) {
      const [, currentTopicInner] = row.split(`${config.topicKey}`);

      currentTopic = currentTopicInner;
    } else {
      const mark = Number(row.split(') ')[1]);

      const currentTopicItem = parsedResultDraft.get(currentTopic);

      if (currentTopicItem) {
        parsedResultDraft.set(currentTopic, [...currentTopicItem, mark]);
      } else {
        parsedResultDraft.set(currentTopic, [mark]);
      }
    }
  });

  return parsedResultDraft;
};

export { parseResultDraft };
