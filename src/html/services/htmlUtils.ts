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
} from '../config';

import type { Level } from '../../input';
import type { InterviewQuestions, Question } from '../types';

const replaceLogicalAnd = (question: string): string =>
  question.includes(LOGICAL_AND) ? question.replace(LOGICAL_AND, '&&') : question;

const parseDatabaseItem = (path: string, question: string, index: number): Question => {
  const questionSplit = question.split(QUESTION_DATA_SEPARATOR);

  return {
    order: index + 1,
    key: `${topicsUtils.topicToKey(databaseTopicsMap[path])}${index + 1}`,
    requiredFor: questionSplit[1].replace(QUESTION_EXTRA_DATA, '') as Level,
    question: replaceLogicalAnd(questionSplit[0]),
  };
};

export const parseTopic = (path: string): Question[] => {
  const html = fs.readFileSync(path, 'utf8');
  const parsedHtml = parse(html);
  const mainContent = parsedHtml.querySelector(MAIN_CONTENT_KEY);
  const mainContentSplit = mainContent?.structuredText.split('\n') || [];

  return mainContentSplit.map((question, index) => parseDatabaseItem(path, question, index));
};

export const parseDatabase = (): InterviewQuestions => {
  return Object.values(config.files.database).reduce((acc, cur) => {
    acc[databaseTopicsMap[cur]] = parseTopic(cur);

    return acc;
  }, {} as InterviewQuestions);
};
