import { questionSets } from '../config';

import type { Input } from '../../input';

export const shouldMarkQuestion = (topicKey: string, questionKey: string, input: Input): boolean => {
  return questionSets[input.interview.mode][input.interview.type][topicKey][input.candidate.supposedLevel].includes(
    questionKey
  );
};
