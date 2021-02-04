export type Role = 'junior' | 'junior+' | 'middle-' | 'middle' | 'middle+' | 'senior';

export type QuestionData = {
  order: number;
  key: string;
  estimatedTimeMin: number;
  requiredFor: Role;
  question: string;
};

export type Question = {
  data: QuestionData[];
};

export type InterviewQuestions = {
  [key in string]: Question;
};

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

export type Person = {
  firstname: string;
  lastname: string;
  email: string;
};

export type Input = {
  supposedRole: Role;
  includedTopics: string[];
  candidate: Person;
  technicalSpecialist: Person;
};

export type PieChart = {
  width: number;
  dataColors: string[];
  fontColor: string;
  fontSize: number;
  fontStyle: string;
  centerFontSize: number;
  dataFontColor: string;
};

export type RadarChart = {
  width: number;
  datasetColor: string;
  datasetBackgroundColor: string;
  fontSize: number;
  fontColor: string;
  fontStyle: string;
  legendFontSize: number;
  gridColor: string;
  ticksBackgroundColor: string;
};

export type PdfDocument = {
  creator: string;
  author: string;
  verticalMargin: number;
  horizontalMargin: number;
  riseappsLogoPath: string;
  logoWidth: number;
  logoMargin: number;
  regularFont: string;
  foreignFontPath: string;
  regularForeignFont: string;
  boldFont: string;
  smallerFontSize: number;
  baseFontSize: number;
  biggerFontSize: number;
};

export type Evaluation = {
  [key: string]: string;
};

export type Config = {
  questionsDatabasePath: string;
  notValidQuestionsFilename: string;
  questionsFilename: string;
  pieChartFilename: string;
  radarChartFilename: string;
  forInterviewerFilename: string;
  resultDraftFilename: string;
  resultNotesDraftFilename: string;
  resultFilename: string;
  suitableQuestionMarker: string;
  pieChart: PieChart;
  radarChart: RadarChart;
  pdfDocument: PdfDocument;
  topicKey: string;
  notesKey: string;
  recommendKey: string;
  questionKey: string;
  maxMark: number;
  evaluation: Evaluation;
};

export type QuestionsDBTopics = {
  [key: string]: string;
};
