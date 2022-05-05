import type { Level } from '../input';

export type Question = {
  order: number;
  key: string;
  requiredFor: Level;
  question: string;
};

export type InterviewQuestions = {
  [key in string]: Question[];
};

export type DatabaseTopicsMap = { [key: string]: string };
