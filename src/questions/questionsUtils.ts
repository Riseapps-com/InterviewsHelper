import fs from 'fs';

import { fsUtils } from '../shared';
import { InterviewQuestions, QuestionData, TopicDuration } from '../types';
import { config, input, interviewStructure } from '../wrappers';

const isSuitableForJunior = (requiredFor: string): boolean => requiredFor === 'junior';

const isSuitableForJuniorPlus = (requiredFor: string): boolean =>
  isSuitableForJunior(requiredFor) || requiredFor === 'junior+';

const isSuitableForMiddleMinus = (requiredFor: string): boolean =>
  isSuitableForJuniorPlus(requiredFor) || requiredFor === 'middle-';

const isSuitableForMiddle = (requiredFor: string): boolean =>
  isSuitableForMiddleMinus(requiredFor) || requiredFor === 'middle';

const isSuitableForMiddlePlus = (requiredFor: string): boolean =>
  isSuitableForMiddle(requiredFor) || requiredFor === 'middle+';

const isSuitableForSenior = (requiredFor: string): boolean =>
  isSuitableForMiddlePlus(requiredFor) || requiredFor === 'senior';

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
        `${index + 1}. ${question.question} (timeForAnswer: ${
          question.estimatedTimeMin
        } min) (requiredFor: ${question.requiredFor}) (key: ${config.questionKey}${question.key}${
          config.questionKey
        })`
    );

    topics.push(
      `${config.topicKey}${key.label}${config.topicKey} ≈${
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
    const suitableQuestions: QuestionData[] = interviewQuestions[
      topic
    ].data.filter((item: QuestionData) =>
      isQuestionSuitable(input.supposedLevel, item.requiredFor)
    );

    if (suitableQuestions.length && questionsMap.get(interviewStructure.topics[globalTopic])) {
      const questions = questionsMap.get(interviewStructure.topics[globalTopic]);

      if (questions) {
        questionsMap.set(interviewStructure.topics[globalTopic], [
          ...questions,
          ...suitableQuestions,
        ]);
      }
    } else if (suitableQuestions.length) {
      questionsMap.set(interviewStructure.topics[globalTopic], suitableQuestions);
    }
  });

  fs.writeFileSync(
    fsUtils.wrapToOutputsDirectory(config.questionsFilename),
    formatQuestions(questionsMap)
  );
};
