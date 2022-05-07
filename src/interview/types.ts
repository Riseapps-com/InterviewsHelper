import type { InterviewMode, InterviewType } from '../input';

export type Status = 'required' | 'optional';

export type Topic = {
  key: string;
  label: string;
  questionsNumber: number;
  duration: number;
  status: Status;
};

export type InterviewTypeSection<T> = {
  [key in string]: T;
};

export type InterviewModeSection<T> = {
  [key in InterviewType]: InterviewTypeSection<T>;
} & { recommendedDuration?: number };

export type InterviewStructure<T> = {
  [key in InterviewMode]: InterviewModeSection<T>;
};
