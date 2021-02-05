import fs from 'fs';
import parse from 'node-html-parser';

import { topicsUtils } from '../shared';
import { InterviewQuestions, Level, Question, QuestionData } from '../types';
import { config, questionsDBTopics } from '../wrappers';

const questionDataSeparator = ' [';
const questionExtraData = ']';
const logicalAnd = '&amp;&amp;';
const mainContentKey = '#main-content';

const replaceLogicalAnd = (question: string): string =>
  question.includes(logicalAnd) ? question.replace(logicalAnd, '&&') : question;

const getDBTopicsIndexes = (content: string[]): number[] =>
  Object.keys(questionsDBTopics).map(topic => {
    let lastIndexOf = -1;

    content.forEach((contentRaw, index) => {
      if (contentRaw.includes(topic)) {
        lastIndexOf = index;
      }
    });

    return lastIndexOf;
  });

const parseDatabaseQuestion = (
  question: string,
  questionsLength: number,
  topic: string
): QuestionData => {
  const questionSplit = question.split(questionDataSeparator);

  return {
    order: questionsLength + 1,
    key: `${topicsUtils.topicToKey(questionsDBTopics[topic])}${questionsLength + 1}`,
    estimatedTimeMin: Number.parseFloat(questionSplit[2].replace(questionExtraData, '')),
    requiredFor: questionSplit[1].replace(questionExtraData, '') as Level,
    question: replaceLogicalAnd(questionSplit[0]),
  };
};

export const parseQuestionsDB = (): InterviewQuestions => {
  const html = fs.readFileSync(config.questionsDatabasePath, 'utf8');

  const parsedHtml = parse(html);
  const mainContent = parsedHtml.querySelector(mainContentKey);
  const mainContentSplit = mainContent.structuredText.split('\n');
  const dbTopicsIndexes = getDBTopicsIndexes(mainContentSplit);

  const interviewQuestions: InterviewQuestions = {};

  dbTopicsIndexes.forEach((dbTopicIndex, index) => {
    const topic = Object.keys(questionsDBTopics).find(dbTopic =>
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

    interviewQuestions[questionsDBTopics[topic]] = question;
  });

  return interviewQuestions;
};
