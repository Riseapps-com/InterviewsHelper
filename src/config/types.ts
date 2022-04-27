import ColorValue = PDFKit.Mixins.ColorValue;

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
