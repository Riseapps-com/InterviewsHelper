import fs from 'fs';
import parse from 'node-html-parser';

import { config } from '../../config';
import { questionsDBTopicsMap } from '../../data';
import { topicsUtils } from '../shared';
import { InterviewQuestions, Level, Question } from '../types';

const questionDataSeparator = ' [';
const questionExtraData = ']';
const logicalAnd = '&amp;&amp;';
const mainContentKey = '#main-content';

const replaceLogicalAnd = (question: string) =>
  question.includes(logicalAnd) ? question.replace(logicalAnd, '&&') : question;

const getDBTopicsIndexes = (content: string[]) =>
  Object.keys(questionsDBTopicsMap).map(topic => {
    let lastIndexOf = -1;

    content.forEach((contentRaw, index) => {
      if (contentRaw.includes(topic)) {
        lastIndexOf = index;
      }
    });

    return lastIndexOf;
  });

const parseDatabaseQuestion = (question: string, questionsLength: number, topic: string) => {
  const questionSplit = question.split(questionDataSeparator);

  return {
    order: questionsLength + 1,
    key: `${topicsUtils.topicToKey(questionsDBTopicsMap[topic])}${questionsLength + 1}`,
    estimatedTimeMin: Number.parseFloat(questionSplit[2].replace(questionExtraData, '')),
    requiredFor: questionSplit[1].replace(questionExtraData, '') as Level,
    question: replaceLogicalAnd(questionSplit[0]),
  };
};

export const parseQuestionsDB = () => {
  const html = fs.readFileSync(config.files.questionsDatabasePath, 'utf8');

  const parsedHtml = parse(html);
  const mainContent = parsedHtml.querySelector(mainContentKey);
  const mainContentSplit = mainContent.structuredText.split('\n');
  const dbTopicsIndexes = getDBTopicsIndexes(mainContentSplit);

  const interviewQuestions: InterviewQuestions = {};

  dbTopicsIndexes.forEach((dbTopicIndex, index) => {
    const topic = Object.keys(questionsDBTopicsMap).find(dbTopic =>
      mainContentSplit[dbTopicIndex].includes(dbTopic)
    );
    const question: Question = {
      data: [],
    };

    const lastDBTopicsItemIndex = dbTopicsIndexes.length - 1;
    const currentDBTopicsIndex = dbTopicsIndexes.findIndex(
      possibleIndex => possibleIndex === dbTopicIndex
    );
    const nextDBTopicsIndex = dbTopicsIndexes[currentDBTopicsIndex + 1];
    const lastContentItemIndex = mainContentSplit.length - 1;
    const until = index === lastDBTopicsItemIndex ? lastContentItemIndex : nextDBTopicsIndex;

    for (let i = dbTopicIndex + 1; i < until; i++) {
      if (mainContentSplit[i] !== 'Links' && !mainContentSplit[i].includes('http')) {
        question.data.push(parseDatabaseQuestion(mainContentSplit[i], question.data.length, topic));
      }
    }

    interviewQuestions[questionsDBTopicsMap[topic]] = question;
  });

  return interviewQuestions;
};
