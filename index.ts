import { buildPieChart } from './src/charts/buildPieChart';
import { buildRadarChart } from './src/charts/buildRadarChart';
import { findSuitableQuestions } from './src/findSuitableQuestions';
import { _generateInterviewPDF } from './src/generateInterviewPDF';
import { generateResultDraft } from './src/generateResultDraft';
import { generateResultNotesDraft } from './src/generateResultNotesDraft';
import { _generateResultPDF } from './src/generateResultPDF';
import { createOutputsDirectory } from './src/utils/createOutputsDirectory';
import { parseQuestions } from './src/utils/parseQuestions';
import { parseResultDraft } from './src/utils/parseResultDraft';
import { parseResultNotesDraft } from './src/utils/parseResultNotes';
import { validateInterviewQuestions } from './src/validateInterviewQuestions';

const validateQuestionsDBArg = process.argv.includes('--validateQuestionsDB');
const findQuestionsArg = process.argv.includes('--findQuestions');
const generateInterviewPDFArg = process.argv.includes('--generateInterviewPDF');
const generateResultPDFArg = process.argv.includes('--generateResultPDF');

const validateQuestionsDB = (): void => {
  console.log('Executing validateQuestionsDB()...');
  if (!validateInterviewQuestions()) {
    console.log('Questions are not valid. See output/notValidQuestions.txt for more details.');
  }
};

const findQuestions = async (): Promise<void> => {
  console.log('Executing findQuestions()...');

  try {
    createOutputsDirectory();
    if (validateInterviewQuestions()) {
      findSuitableQuestions();
      await buildPieChart();
    }
  } catch (error) {
    console.log(error);
  }
};

const generateInterviewPDF = async (): Promise<void> => {
  console.log('Executing generateInterviewPDF()...');

  try {
    const parsedQuestions = parseQuestions();

    _generateInterviewPDF(parsedQuestions);
    generateResultDraft(parsedQuestions);
    generateResultNotesDraft();
  } catch (error) {
    console.log(error);
  }
};

const generateResultPDF = async (): Promise<void> => {
  console.log('Executing generateResultPDF()...');

  try {
    const parsedResultDraft = parseResultDraft();
    const parsedResultNotesDraft = parseResultNotesDraft();

    await buildRadarChart(parsedResultDraft);
    _generateResultPDF(parsedResultDraft, parsedResultNotesDraft);
  } catch (error) {
    console.log(error);
  }
};

if (validateQuestionsDBArg) {
  validateQuestionsDB();
}

if (findQuestionsArg) {
  findQuestions();
}

if (generateInterviewPDFArg) {
  generateInterviewPDF();
}

if (generateResultPDFArg) {
  generateResultPDF();
}
