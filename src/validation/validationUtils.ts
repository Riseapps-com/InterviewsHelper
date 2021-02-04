import fs from 'fs';

import { fsUtils, topicsUtils } from '../shared';
import { InterviewQuestions, QuestionData } from '../types';
import { config } from '../wrappers';

const validateRequiredFor = (requiredFor: string): boolean =>
  requiredFor === 'junior' ||
  requiredFor === 'junior+' ||
  requiredFor === 'middle-' ||
  requiredFor === 'middle' ||
  requiredFor === 'middle+' ||
  requiredFor === 'senior';

const validateQuestion = (question: QuestionData, index: number, key: string): boolean =>
  question.order === index + 1 &&
  !!question.estimatedTimeMin &&
  !!question.question &&
  question.key === `${key}${index + 1}` &&
  validateRequiredFor(question.requiredFor);

const areQuestionsValid = (
  questions: QuestionData[],
  topic: string,
  notValidQuestions: string[],
  key: string
): boolean =>
  questions.reduce((prev: boolean, curr, index) => {
    const isValid: boolean = validateQuestion(curr, index, key);

    if (!isValid) {
      notValidQuestions.push(`${topic}: ${index + 1}`);
    }

    return prev && isValid;
  }, true);

const saveNotValidQuestionsToFile = (notValidQuestions: string[]): void => {
  if (notValidQuestions.length) {
    fs.writeFileSync(
      fsUtils.wrapToOutputsDirectory(config.notValidQuestionsFilename),
      notValidQuestions.join('\n')
    );
  } else if (fs.existsSync(fsUtils.wrapToOutputsDirectory(config.notValidQuestionsFilename))) {
    fs.unlinkSync(fsUtils.wrapToOutputsDirectory(config.notValidQuestionsFilename));
  }
};

export const validateInterviewQuestions = (interviewQuestions: InterviewQuestions): boolean => {
  console.log('validateInterviewQuestions()');

  const notValidQuestions: string[] = [];

  const isValid: boolean = Object.keys(interviewQuestions).reduce(
    (_: boolean, curr: string) =>
      areQuestionsValid(
        interviewQuestions[curr].data,
        curr,
        notValidQuestions,
        topicsUtils.topicToKey(curr)
      ),
    true
  );

  saveNotValidQuestionsToFile(notValidQuestions);

  return isValid;
};
