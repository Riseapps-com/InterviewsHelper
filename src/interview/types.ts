export type Status = 'optional' | 'required';

export type TopicDuration = {
  status: Status;
  durationMin: number;
  label: string;
  questionsNumber: number;
};

export type Topics = {
  [key in string]: TopicDuration;
};

export type InterviewStructure = {
  totalDurationMin: number;
  topics: Topics;
  requiredSections: string[];
  optionalSections: string[];
};
