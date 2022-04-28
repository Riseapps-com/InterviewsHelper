import fs from 'fs';
import parse from 'node-html-parser';

import { config } from '../../config';
import { topicsUtils } from '../../topics';
import {
  databaseTopicsMap,
  LOGICAL_AND,
  MAIN_CONTENT_KEY,
  QUESTION_DATA_SEPARATOR,
  QUESTION_EXTRA_DATA,
  WORDS_TO_IGNORE,
} from '../config';

import type { Level } from '../../input';
import type { InterviewQuestions, Question, QuestionData } from '../types';

const replaceLogicalAnd = (question: string): string =>
  question.includes(LOGICAL_AND) ? question.replace(LOGICAL_AND, '&&') : question;

const getDatabaseTopicIndexes = (content: string[]): number[] =>
  Object.keys(databaseTopicsMap).map(topic => {
    let lastIndexOf = -1;

    content.forEach((contentRaw, index) => {
      if (contentRaw.includes(topic)) lastIndexOf = index;
    });

    return lastIndexOf;
  });

const parseDatabaseItem = (question: string, questionsLength: number, topic: string): QuestionData => {
  const questionSplit = question.split(QUESTION_DATA_SEPARATOR);

  return {
    order: questionsLength + 1,
    key: `${topicsUtils.topicToKey(databaseTopicsMap[topic])}${questionsLength + 1}`,
    estimatedTimeMin: Number.parseFloat(questionSplit[2].replace(QUESTION_EXTRA_DATA, '')),
    requiredFor: questionSplit[1].replace(QUESTION_EXTRA_DATA, '') as Level,
    question: replaceLogicalAnd(questionSplit[0]),
  };
};

export const parseDatabase = (): InterviewQuestions => {
  const html = fs.readFileSync(config.files.questionsDatabasePath, 'utf8');

  const parsedHtml = parse(html);
  const mainContent = parsedHtml.querySelector(MAIN_CONTENT_KEY);
  const mainContentSplit = mainContent?.structuredText.split('\n') || [];
  const databaseTopicIndexes = getDatabaseTopicIndexes(mainContentSplit);

  const interviewQuestions: InterviewQuestions = {};

  databaseTopicIndexes.forEach((databaseTopicIndex, index) => {
    const topic = Object.keys(databaseTopicsMap).find(databaseTopic =>
      mainContentSplit[databaseTopicIndex].includes(databaseTopic)
    );
    const question: Question = { data: [] };

    const lastDatabaseTopicItemIndex = databaseTopicIndexes.length - 1;
    const currentDatabaseTopicIndex = databaseTopicIndexes.findIndex(
      possibleIndex => possibleIndex === databaseTopicIndex
    );
    const nextDatabaseTopicIndex = databaseTopicIndexes[currentDatabaseTopicIndex + 1];
    const lastContentItemIndex = mainContentSplit.length - 1;
    const until = index === lastDatabaseTopicItemIndex ? lastContentItemIndex : nextDatabaseTopicIndex;

    for (let i = databaseTopicIndex + 1; i < until; i++) {
      if (WORDS_TO_IGNORE.every(item => !mainContentSplit[i].includes(item)) && topic) {
        const databaseItem = parseDatabaseItem(mainContentSplit[i], question.data.length, topic);

        question.data.push(databaseItem);
      }
    }

    if (topic) interviewQuestions[databaseTopicsMap[topic]] = question;
  });

  return interviewQuestions;
};
