import fs from 'fs';

import { config } from '../../config';
import { fsUtils } from '../../fs';
import { inputUtils } from '../../input';
import { interviewStructure } from '../../interview';
import { questionSetsUtilities } from '../../questionSets';
import { QUESTION_DEFAULT_DURATION, TEST_TASK_DEPARTMENT_DURATION, TEST_TASK_PARTNERSHIP_DURATION } from '../config';

import type { InterviewQuestions, Question } from '../../html';
import type { Input } from '../../input';
import type { Topic } from '../../interview';

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

const formatQuestions = (questionsMap: Map<Topic, Question[]>): string => {
  const input = inputUtils.getInput();
  const topics: string[] = [];

  questionsMap.forEach((value, key) => {
    const questions: string[] = value.map((question, index) => {
      const shouldMarkQuestion = questionSetsUtilities.shouldMarkQuestion(key.key, question.key, input);

      return `${shouldMarkQuestion ? config.files.suitableQuestionMarker : ''}${index + 1}. ${question.question} `
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

export const calculateTopicDuration = (input: Input, question: string, questionsLength?: number): number => {
  if (!questionsLength) return -1;

  const topic = Object.values(interviewStructure[input.interview.mode][input.interview.type]).find(
    interviewTopic => interviewTopic.label === question
  );

  if (!topic) return -1;

  if (topic.key === 'testTasks' && input.interview.mode === 'department') {
    return questionsLength * TEST_TASK_DEPARTMENT_DURATION;
  }

  if (topic.key === 'testTasks' && input.interview.mode === 'partnership') {
    return questionsLength * TEST_TASK_PARTNERSHIP_DURATION;
  }

  if (topic.key === 'softwareSkills') {
    return questionsLength;
  }

  return questionsLength * QUESTION_DEFAULT_DURATION;
};

export const generateQuestions = (interviewQuestions: InterviewQuestions): void => {
  const input = inputUtils.getInput();
  const questionsMap = new Map<Topic, Question[]>();
  const section = interviewStructure[input.interview.mode][input.interview.type];

  input.interview.topics.forEach(topic => {
    const globalTopic = topic.includes('.') ? topic.split('.')[0] : topic;
    const suitableQuestions = interviewQuestions[topic].filter((item: Question) =>
      isQuestionSuitable(input.candidate.supposedLevel, item.requiredFor)
    );

    if (suitableQuestions.length && questionsMap.get(section[globalTopic])) {
      const questions = questionsMap.get(section[globalTopic]);

      if (!questions) return;

      questionsMap.set(section[globalTopic], [...questions, ...suitableQuestions]);
    } else if (suitableQuestions.length) {
      questionsMap.set(section[globalTopic], suitableQuestions);
    }
  });

  fs.writeFileSync(
    fsUtils.wrapToOutputDirectory(config.files.interview.questionsFilename),
    formatQuestions(questionsMap)
  );
};
