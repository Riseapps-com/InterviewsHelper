import fs from 'fs';
import parse from 'node-html-parser';

import { topicsUtils } from '../shared';
import { InterviewQuestions, Question, QuestionData, Level } from '../types';
import { config, questionsDBTopics } from '../wrappers';

const questionDataSeparator = ' [';
const questionExtraData = ']';
const ignoredRows = ['Links', 'http'];

const getTopicsIndexes = (content: string[]) =>
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
    question: questionSplit[0],
  };
};

export const parseQuestionsDB = (): InterviewQuestions => {
  const html = fs.readFileSync(config.questionsDatabasePath, 'utf8');

  const parsedHtml = parse(html);
  const mainContent = parsedHtml.querySelector('#main-content');
  const mainContentSplit = mainContent.structuredText.split('\n');
  const topicsIndexes = getTopicsIndexes(mainContentSplit);

  const interviewQuestions: InterviewQuestions = {};

  topicsIndexes.forEach((topicIndex, index) => {
    const topic = Object.keys(questionsDBTopics).find(innerTopic =>
      mainContentSplit[topicIndex].includes(innerTopic)
    );
    const question: Question = {
      data: [],
    };

    const until =
      index === topicsIndexes.length - 1
        ? mainContentSplit.length - 1
        : topicsIndexes[topicsIndexes.findIndex(innerIndex => innerIndex === topicIndex) + 1];

    for (let i = topicIndex + 1; i < until; i++) {
      if (mainContentSplit[i] !== ignoredRows[0] && !mainContentSplit[i].includes(ignoredRows[1])) {
        question.data.push(parseDatabaseQuestion(mainContentSplit[i], question.data.length, topic));
      }
    }

    interviewQuestions[questionsDBTopics[topic]] = question;
  });

  return interviewQuestions;
};
