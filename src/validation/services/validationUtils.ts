import fs from 'fs';

import { config } from '../../config';
import { topicsUtils } from '../../topics';

import type { InterviewQuestions, Question } from '../../html';

const validateRequiredFor = (requiredFor: string): boolean => {
  return (
    requiredFor === 'junior' ||
    requiredFor === 'junior+' ||
    requiredFor === 'middle-' ||
    requiredFor === 'middle' ||
    requiredFor === 'middle+' ||
    requiredFor === 'senior'
  );
};

const validateQuestion = (question: Question, key: string, index: number): boolean => {
  return (
    question.order === index + 1 &&
    !!question.question &&
    question.key === `${key}${index + 1}` &&
    validateRequiredFor(question.requiredFor)
  );
};

const areQuestionsValid = (questions: Question[], notValidQuestions: string[], key: string, topic: string): boolean => {
  return questions.reduce((prev: boolean, curr, index) => {
    const isValid = validateQuestion(curr, key, index);

    if (!isValid) notValidQuestions.push(`${topic}: ${index + 1}`);

    return prev && isValid;
  }, true);
};

const saveNotValidQuestionsToFile = (notValidQuestions: string[]): void => {
  if (notValidQuestions.length) {
    fs.writeFileSync(config.files.notValidQuestionsFilename, notValidQuestions.join('\n'));
  } else if (fs.existsSync(config.files.notValidQuestionsFilename)) {
    fs.unlinkSync(config.files.notValidQuestionsFilename);
  }
};

export const validateInterviewQuestions = (interviewQuestions: InterviewQuestions): boolean => {
  const notValidQuestions: string[] = [];

  const isValid = Object.keys(interviewQuestions).every(key =>
    areQuestionsValid(interviewQuestions[key], notValidQuestions, topicsUtils.topicToKey(key), key)
  );

  saveNotValidQuestionsToFile(notValidQuestions);

  return isValid;
};
