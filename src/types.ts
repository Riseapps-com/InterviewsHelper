import ColorValue = PDFKit.Mixins.ColorValue;

export type Level = 'junior' | 'junior+' | 'middle-' | 'middle' | 'middle+' | 'senior';

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
  includedTopics: string[];
  candidate: Candidate;
  interviewer: Interviewer;
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
  regularFont: string;
  regularFontPath: string;
  boldFont: string;
  boldFontPath: string;
  smallerFontSize: number;
  baseFontSize: number;
  biggerFontSize: number;
  biggestFontSize: number;
  brandColor: ColorValue;
  blackColor: ColorValue;
  riseappsLogoPath: string;
  logoWidth: number;
  logoMargin: number;
  pieChartWidth: number;
  radarChartWidth: number;
  emailIconPath: string;
  linkedinIconPath: string;
  userIconPath: string;
  iconWidth: number;
  lineMargin: number;
};

export type Files = {
  questionsDatabasePath: string;
  notValidQuestionsFilename: string;
  questionsFilename: string;
  radarChartFilename: string;
  forInterviewerFilename: string;
  resultDraftFilename: string;
  resultNotesDraftFilename: string;
  pieChartFilename: string;
  resultFilename: string;
  suitableQuestionMarker: string;
};

export type Parsers = {
  topicKey: string;
  questionKey: string;
  feedbackKey: string;
  decisionKey: string;
};

export type Scale = {
  [key: string]: string;
};

export type Evaluation = {
  maxMark: number;
  scale: Scale;
};

export type Config = {
  files: Files;
  pieChart: PieChart;
  radarChart: RadarChart;
  pdfDocument: PdfDocument;
  parsers: Parsers;
  evaluation: Evaluation;
};

export type QuestionsDBTopicsMap = {
  [key: string]: string;
};
