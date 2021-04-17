import fs from 'fs';

import { config } from '../../config';
import { fsUtils, topicsUtils } from '../shared';
import { InterviewQuestions, QuestionData } from '../types';

const validateRequiredFor = (requiredFor: string) => {
  const isValid =
    requiredFor === 'junior' ||
    requiredFor === 'junior+' ||
    requiredFor === 'middle-' ||
    requiredFor === 'middle' ||
    requiredFor === 'middle+' ||
    requiredFor === 'senior';

  return isValid;
};

const validateQuestion = (question: QuestionData, key: string, index: number) => {
  const isValid =
    question.order === index + 1 &&
    !!question.estimatedTimeMin &&
    !!question.question &&
    question.key === `${key}${index + 1}` &&
    validateRequiredFor(question.requiredFor);

  return isValid;
};

const areQuestionsValid = (
  questions: QuestionData[],
  notValidQuestions: string[],
  key: string,
  topic: string
) => {
  const areValid = questions.reduce((prev: boolean, curr, index) => {
    const isValid: boolean = validateQuestion(curr, key, index);

    if (!isValid) {
      notValidQuestions.push(`${topic}: ${index + 1}`);
    }

    return prev && isValid;
  }, true);

  return areValid;
};

const saveNotValidQuestionsToFile = (notValidQuestions: string[]) => {
  if (notValidQuestions.length) {
    fs.writeFileSync(
      fsUtils.wrapToOutputDirectory(config.files.notValidQuestionsFilename),
      notValidQuestions.join('\n')
    );
  } else if (fs.existsSync(fsUtils.wrapToOutputDirectory(config.files.notValidQuestionsFilename))) {
    fs.unlinkSync(fsUtils.wrapToOutputDirectory(config.files.notValidQuestionsFilename));
  }
};

export const validateInterviewQuestions = (interviewQuestions: InterviewQuestions) => {
  console.log('validateInterviewQuestions()');

  const notValidQuestions: string[] = [];

  const isValid: boolean = Object.keys(interviewQuestions).reduce(
    (_: boolean, curr: string) =>
      areQuestionsValid(
        interviewQuestions[curr].data,
        notValidQuestions,
        topicsUtils.topicToKey(curr),
        curr
      ),
    true
  );

  saveNotValidQuestionsToFile(notValidQuestions);

  return isValid;
};
