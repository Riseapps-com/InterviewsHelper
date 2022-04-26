import { config } from './config';
import { htmlUtils } from './src/html';
import { interviewUtils } from './src/interview';
import { questionsUtils } from './src/questions';
import { resultUtils } from './src/result';
import { chartsUtils, fsUtils } from './src/shared';
import { validationUtils } from './src/validation';

import type { InterviewQuestions } from './src/types';

const validateQuestionsDBArg = process.argv.includes('--validateQuestionsDB');
const generateQuestionsArg = process.argv.includes('--generateQuestions');
const generateInterviewPDFArg = process.argv.includes('--generateInterviewPDF');
const generateResultPDFArg = process.argv.includes('--generateResultPDF');

const interviewQuestions: InterviewQuestions = htmlUtils.parseQuestionsDB();

fsUtils.createOutputsDirectory();
fsUtils.createOutputDirectory();

const validateQuestionsDB = (): void => {
  if (!validationUtils.validateInterviewQuestions(interviewQuestions)) {
    console.log(`Questions are not valid. 
      See ${fsUtils.outputDirectory}/${config.files.notValidQuestionsFilename} for more details.`);
  }
};

const generateQuestions = async (): Promise<void> => {
  try {
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
    resultUtils.generateResultPDF(parsedResultNotesDraft);
  } catch (error) {
    console.log(error);
  }
};

if (validateQuestionsDBArg) validateQuestionsDB();
if (generateQuestionsArg) generateQuestions();
if (generateInterviewPDFArg) generateInterviewPDF();
if (generateResultPDFArg) generateResultPDF();
