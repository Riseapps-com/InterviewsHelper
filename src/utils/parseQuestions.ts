import fs from 'fs';

import { QuestionData } from '../types';
import config from '../wrappers/config';
import interviewQuestions from '../wrappers/interviewQuestions';
import { wrapToOutputsDirectory } from './createOutputsDirectory';

const parseQuestions = (): Map<string, QuestionData[]> => {
  console.log(`parseQuestions()`);

  const parsedQuestions = new Map<string, QuestionData[]>();
  const rows: string[] = fs
    .readFileSync(wrapToOutputsDirectory(config.questionsFilename), 'utf8')
    .split('\n')
    .filter(row => row.includes(config.topicKey) || row.startsWith(config.suitableQuestionMarker));
  let currentTopic: string;

  rows.forEach(row => {
    if (row.includes(config.topicKey)) {
      const [, currentTopicInner] = row.split(`${config.topicKey}`);

      currentTopic = currentTopicInner;
    } else {
      const questionSplit: string[] = row.split(config.questionKey);
      const questionKey: string = questionSplit[1];
      let interviewQuestion: QuestionData | undefined;

      Object.values(interviewQuestions).forEach(question => {
        if (!interviewQuestion) {
          interviewQuestion = question.data.find(item => item.key === questionKey);
        }
      });

      const parsedQuestionsItem = parsedQuestions.get(currentTopic);

      if (interviewQuestion && parsedQuestionsItem) {
        parsedQuestions.set(currentTopic, [...parsedQuestionsItem, interviewQuestion]);
      } else if (interviewQuestion) {
        parsedQuestions.set(currentTopic, [interviewQuestion]);
      }
    }
  });

  return parsedQuestions;
};

export { parseQuestions };
