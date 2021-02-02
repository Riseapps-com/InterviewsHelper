import fs from 'fs';
import parse from 'node-html-parser';

import { Question, Role } from './types';

const topics = [
  'JAVASCRIPT',
  'TYPESCRIPT',
  'REACT BASICS',
  'REDUX',
  'MOBX',
  'HOOKS',
  'REACT ADVANCED',
  'APOLLO GRAPHQL',
  'REACT NATIVE',
  'IOS',
  'ANDROID',
  'JEST',
  'DETOX',
  'DATA STRUCTURES AND ALGORITHMS',
  'COMMUNICATION SKILLS',
  'TEST TASKS',
  'OTHER',
];

const _parseConfluencePage = () => {
  const html = fs.readFileSync('data/Questions-Database_2009104385.html', 'utf8');

  const parsedHtml = parse(html);
  const mainContent = parsedHtml.querySelector('#main-content');

  const contentSplit = mainContent.structuredText.split('\n');
  const topicsIndexes = topics.map(topic => {
    let lastIndexOf = -1;

    contentSplit.forEach((raw, index) => {
      if (raw.includes(topic)) {
        lastIndexOf = index;
      }
    });

    return lastIndexOf;
  });

  const mapped = topicsIndexes.map((topicIndex, index) => {
    const topic = contentSplit[topicIndex];
    const question: Question = {
      data: [],
      links: [],
    };

    const until =
      index === topicsIndexes.length - 1
        ? contentSplit.length - 1
        : topicsIndexes[topicsIndexes.findIndex(innerIndex => innerIndex === topicIndex) + 1];

    // eslint-disable-next-line no-plusplus
    for (let i = topicIndex + 1; i < until; i++) {
      if (contentSplit[i] !== 'Links' && !contentSplit[i].includes('http')) {
        const questionSplit = contentSplit[i].split(' (');

        question.data.push({
          order: question.data.length + 1,
          key: topic,
          estimatedTimeMin: Number.parseFloat(questionSplit[2].replace(')', '')),
          requiredFor: questionSplit[1].replace(')', '') as Role,
          question: questionSplit[0],
        });
      }

      if (contentSplit[i].includes('http')) {
        question.links.push(contentSplit[i]);
      }
    }

    return question;
  });

  fs.writeFile('test.json', JSON.stringify(mapped), () => {
    console.log('success');
  });
};

export { _parseConfluencePage };
