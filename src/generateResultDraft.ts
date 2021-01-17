import fs from 'fs';

import { QuestionData } from './types';
import { wrapToOutputsDirectory } from './utils/createOutputsDirectory';
import config from './wrappers/config';

const generateResultDraft = (questions: Map<string, QuestionData[]>): void => {
  console.log(`generateResultDraft(${[...questions.keys()]})`);

  const topics: string[] = [];

  Array.of(...questions.keys()).forEach(key => {
    topics.push(
      `${config.topicKey}${key}${config.topicKey}\n${questions
        .get(key)
        ?.map((_, index) => `${index + 1})`)
        .join('\n')}`
    );
  });

  fs.writeFileSync(wrapToOutputsDirectory(config.resultDraftFilename), topics.join('\n'));
};

export { generateResultDraft };
