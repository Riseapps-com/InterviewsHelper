import data from './data.json';

import type { InterviewStructure } from '../interview';
import type { QuestionSets } from './types';

const questionSets: InterviewStructure<QuestionSets> = data;

export { questionSets };
