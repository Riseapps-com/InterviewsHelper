import type { Level } from '../input';

export type QuestionData = {
  order: number;
  key: string;
  estimatedTimeMin: number;
  requiredFor: Level;
  question: string;
};

export type Question = {
  data: QuestionData[];
};

export type InterviewQuestions = {
  [key in string]: Question;
};

export type DatabaseTopicsMap = { [key: string]: string };
