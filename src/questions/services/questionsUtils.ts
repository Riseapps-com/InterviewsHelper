import fs from 'fs';

import { config } from '../../config';
import { fsUtils } from '../../fs';
import { inputUtils } from '../../input';
import { interviewStructure } from '../../interview';

import type { InterviewQuestions, Question } from '../../html';
import type { TopicDuration } from '../../interview';

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

const formatQuestions = (questionsMap: Map<TopicDuration, Question[]>): string => {
  const topics: string[] = [];

  questionsMap.forEach((value, key) => {
    const questions: string[] = value.map((question, index) => {
      return `${index + 1}. ${question.question} `
        .concat(`(requiredFor: ${question.requiredFor}) `)
        .concat(`(key: ${config.parsers.questionKey}${question.key}${config.parsers.questionKey})`);
    });

    const topic = `${config.parsers.topicKey}${key.label}${config.parsers.topicKey} `.concat(
      `≈${key.questionsNumber} `.concat(`questions\n${questions.join('\n')}`)
    );

    topics.push(topic);
  });

  return topics.join('\n');
};

export const generateQuestions = (interviewQuestions: InterviewQuestions): void => {
  const questionsMap = new Map<TopicDuration, Question[]>();

  inputUtils.getInput().interview.topics.forEach(topic => {
    const globalTopic = topic.includes('.') ? topic.split('.')[0] : topic;
    const suitableQuestions = interviewQuestions[topic].filter((item: Question) =>
      isQuestionSuitable(inputUtils.getInput().candidate.supposedLevel, item.requiredFor)
    );

    if (suitableQuestions.length && questionsMap.get(interviewStructure.topics[globalTopic])) {
      const questions = questionsMap.get(interviewStructure.topics[globalTopic]);

      if (!questions) return;

      questionsMap.set(interviewStructure.topics[globalTopic], [...questions, ...suitableQuestions]);
    } else if (suitableQuestions.length) {
      questionsMap.set(interviewStructure.topics[globalTopic], suitableQuestions);
    }
  });

  fs.writeFileSync(fsUtils.wrapToOutputDirectory(config.files.questionsFilename), formatQuestions(questionsMap));
};
