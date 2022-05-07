import type { InterviewMode, InterviewType } from '../input';

export type Status = 'required' | 'optional';

export type Topic = {
  label: string;
  questionsNumber: number;
  duration: number;
  status: Status;
};

export type InterviewTypeSection = {
  [key in string]: Topic;
};

export type InterviewModeSection = {
  [key in InterviewType]: InterviewTypeSection;
} & { recommendedDuration: number };

export type InterviewStructure = {
  [key in InterviewMode]: InterviewModeSection;
};
