import type { Choice } from 'prompts';

export type InterviewType = 'react' | 'reactNative' | 'angular' | 'node';

export type InterviewMode = 'department' | 'partnership';

export type InterviewTopics = { [key in InterviewType]: Choice[] };

export type Level = 'junior' | 'junior+' | 'middle-' | 'middle' | 'middle+' | 'senior';

export type Interview = {
  type: InterviewType;
  mode: InterviewMode;
  topics: string[];
};

export type Candidate = {
  firstname: string;
  lastname: string;
  email: string;
  supposedLevel: Level;
};

export type Interviewer = {
  firstname: string;
  lastname: string;
  email: string;
  linkedin: string;
};

export type Input = {
  interview: Interview;
  candidate: Candidate;
  interviewer: Interviewer;
  useQuestionSets: boolean;
};
