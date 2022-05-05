import ColorValue = PDFKit.Mixins.ColorValue;

export type Database = {
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
  database: Database;
  notValidQuestionsFilename: string;
  configFilename: string;
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

export type Config = {
  files: Files;
  pieChart: PieChart;
  radarChart: RadarChart;
  pdfDocument: PdfDocument;
  parsers: Parsers;
  evaluation: Evaluation;
};
