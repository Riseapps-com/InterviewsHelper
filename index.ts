import { htmlUtils } from './src/html';
import { interviewUtils } from './src/interview';
import { questionsUtils } from './src/questions';
import { resultUtils } from './src/result';
import { chartsUtils, fsUtils } from './src/shared';
import { InterviewQuestions } from './src/types';
import { validationUtils } from './src/validation';
import { config } from './src/wrappers';

const validateQuestionsDBArg = process.argv.includes('--validateQuestionsDB');
const generateQuestionsArg = process.argv.includes('--generateQuestions');
const generateInterviewPDFArg = process.argv.includes('--generateInterviewPDF');
const generateResultPDFArg = process.argv.includes('--generateResultPDF');

const parseQuestionsDB = () => {
  let interviewQuestions: InterviewQuestions;

  try {
    interviewQuestions = htmlUtils.parseQuestionsDB();
  } catch (error) {
    console.log(error);
  }

  return interviewQuestions;
};

const interviewQuestions: InterviewQuestions = parseQuestionsDB();

const validateQuestionsDB = (): void => {
  console.log(JSON.stringify(interviewQuestions));
  fsUtils.createOutputsDirectory();
  if (!validationUtils.validateInterviewQuestions(interviewQuestions)) {
    console.log(`Questions are not valid. 
      See ${fsUtils.outputsDirectory}/${config.notValidQuestionsFilename} for more details.`);
  }
};

const generateQuestions = async (): Promise<void> => {
  try {
    fsUtils.createOutputsDirectory();
    if (validationUtils.validateInterviewQuestions(interviewQuestions)) {
      questionsUtils.generateQuestions(interviewQuestions);
      await chartsUtils.buildPieChart();
    }
  } catch (error) {
    console.log(error);
  }
};

const generateInterviewPDF = async (): Promise<void> => {
  try {
    const parsedQuestions = interviewUtils.parseQuestions(interviewQuestions);

    interviewUtils.generateInterviewPDF(parsedQuestions);
    interviewUtils.generateResultDraft(parsedQuestions);
    interviewUtils.generateResultNotesDraft();
  } catch (error) {
    console.log(error);
  }
};

const generateResultPDF = async (): Promise<void> => {
  try {
    const parsedResultDraft = resultUtils.parseResultDraft();
    const parsedResultNotesDraft = resultUtils.parseResultNotesDraft();

    await chartsUtils.buildRadarChart(parsedResultDraft);
    resultUtils.generateResultPDF(parsedResultDraft, parsedResultNotesDraft);
  } catch (error) {
    console.log(error);
  }
};

if (validateQuestionsDBArg) {
  validateQuestionsDB();
}

if (generateQuestionsArg) {
  generateQuestions();
}

if (generateInterviewPDFArg) {
  generateInterviewPDF();
}

if (generateResultPDFArg) {
  generateResultPDF();
}
