import data from './data.json';

import type { InterviewStructure, Topic } from './types';

const interviewStructure = data as InterviewStructure<Topic>;

export { interviewStructure };
