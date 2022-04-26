import fs from 'fs';

import { config, input } from '../../config';
import { interviewStructure } from '../../data';
import { fsUtils } from '../shared';

import type { InterviewQuestions, QuestionData, TopicDuration } from '../types';

const isSuitableForJunior = (requiredFor: string): boolean => {
  return requiredFor === 'junior';
};

const isSuitableForJuniorPlus = (requiredFor: string): boolean => {
  return isSuitableForJunior(requiredFor) || requiredFor === 'junior+';
};

const isSuitableForMiddleMinus = (requiredFor: string): boolean => {
  return isSuitableForJuniorPlus(requiredFor) || requiredFor === 'middle-';
};

const isSuitableForMiddle = (requiredFor: string): boolean => {
  return isSuitableForMiddleMinus(requiredFor) || requiredFor === 'middle';
};

const isSuitableForMiddlePlus = (requiredFor: string): boolean => {
  return isSuitableForMiddle(requiredFor) || requiredFor === 'middle+';
};

const isSuitableForSenior = (requiredFor: string): boolean => {
  return isSuitableForMiddlePlus(requiredFor) || requiredFor === 'senior';
};

const isQuestionSuitable = (level: string, requiredFor: string): boolean => {
  let isSuitable = false;

  switch (level) {
    case 'junior':
      isSuitable = isSuitableForJunior(requiredFor);
      break;
    case 'junior+':
      isSuitable = isSuitableForJuniorPlus(requiredFor);
      break;
    case 'middle-':
      isSuitable = isSuitableForMiddleMinus(requiredFor);
      break;
    case 'middle':
      isSuitable = isSuitableForMiddle(requiredFor);
      break;
    case 'middle+':
      isSuitable = isSuitableForMiddlePlus(requiredFor);
      break;
    case 'senior':
      isSuitable = isSuitableForSenior(requiredFor);
      break;
    default:
  }

  return isSuitable;
};

const formatQuestions = (questionsMap: Map<TopicDuration, QuestionData[]>): string => {
  const topics: string[] = [];

  questionsMap.forEach((value, key) => {
    const questions: string[] = value.map(
      (question, index) =>
        `${index + 1}. ${question.question} (timeForAnswer: ${question.estimatedTimeMin} min) (requiredFor: ${
          question.requiredFor
        }) (key: ${config.parsers.questionKey}${question.key}${config.parsers.questionKey})`
    );

    topics.push(
      `${config.parsers.topicKey}${key.label}${config.parsers.topicKey} ≈${
        key.questionsNumber
      } questions\n${questions.join('\n')}`
    );
  });

  return topics.join('\n');
};

export const generateQuestions = (interviewQuestions: InterviewQuestions): void => {
  console.log(`generateQuestions()`);

  const questionsMap = new Map<TopicDuration, QuestionData[]>();

  input.includedTopics.forEach(topic => {
    const globalTopic: string = topic.includes('.') ? topic.split('.')[0] : topic;
    const suitableQuestions: QuestionData[] = interviewQuestions[topic].data.filter((item: QuestionData) =>
      isQuestionSuitable(input.candidate.supposedLevel, item.requiredFor)
    );

    if (suitableQuestions.length && questionsMap.get(interviewStructure.topics[globalTopic])) {
      const questions = questionsMap.get(interviewStructure.topics[globalTopic]);

      if (questions) {
        questionsMap.set(interviewStructure.topics[globalTopic], [...questions, ...suitableQuestions]);
      }
    } else if (suitableQuestions.length) {
      questionsMap.set(interviewStructure.topics[globalTopic], suitableQuestions);
    }
  });

  fs.writeFileSync(fsUtils.wrapToOutputDirectory(config.files.questionsFilename), formatQuestions(questionsMap));
};
