export type PdfIcons = {
  angular: string;
  department: string;
  email: string;
  linkedin: string;
  node: string;
  partnership: string;
  react: string;
  reactNative: string;
  riseappsLogo: string;
  user: string;
  vue: string;
};

export type PdfFonts = {
  regularFont: string;
  regularFontPath: string;
  boldFont: string;
  boldFontPath: string;
  smallerFontSize: number;
  baseFontSize: number;
  biggerFontSize: number;
  biggestFontSize: number;
};

export type PdfColors = {
  brandColor: [number, number, number];
  blackColor: [number, number, number];
};

export type PdfSizes = {
  verticalMargin: number;
  horizontalMargin: number;
  logoWidth: number;
  logoMargin: number;
  radarChartWidth: number;
  iconWidth: number;
  lineMargin: number;
};

export type PdfDocument = {
  creator: string;
  author: string;
  fonts: PdfFonts;
  colors: PdfColors;
  sizes: PdfSizes;
  icons: PdfIcons;
};

export type DatabaseFiles = {
  angularPath: string;
  dataStructuresAndAlgorithmsPath: string;
  experiencePath: string;
  javaScriptPath: string;
  nativePlatformsIosPath: string;
  nativePlatformsAndroidPath: string;
  nodePath: string;
  reactAdvancedPath: string;
  reactApolloPath: string;
  reactBasicsPath: string;
  reactHooksPath: string;
  reactReduxPath: string;
  reactNativePath: string;
  softwareSkillsPath: string;
  testingPathDetox: string;
  testingPathJest: string;
  testTasksPath: string;
  typeScriptPath: string;
  vuePath: string;
};

export type InterviewFiles = {
  notValidQuestionsFilename: string;
  inputFilename: string;
  questionsFilename: string;
  forInterviewerFilename: string;
};

export type ResultFiles = {
  radarChartFilename: string;
  resultDraftFilename: string;
  resultNotesDraftFilename: string;
  resultFilename: string;
};

export type Files = {
  database: DatabaseFiles;
  interview: InterviewFiles;
  result: ResultFiles;
  suitableQuestionMarker: string;
};

export type Parsers = {
  topicKey: string;
  questionKey: string;
  englishLevelKey: string;
  softwareSkillsKey: string;
  technicalSkillsKey: string;
  supposedLevelKey: string;
  recommendKey: string;
};

export type Scale = {
  [key: string]: string;
};

export type Evaluation = {
  maxMark: number;
  scale: Scale;
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

export type Config = {
  files: Files;
  radarChart: RadarChart;
  pdfDocument: PdfDocument;
  parsers: Parsers;
  evaluation: Evaluation;
};
