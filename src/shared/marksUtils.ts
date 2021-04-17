import { config } from '../../config';

export const normalizeMarks = (marks: number[][]) => {
  const normalizedMarks = marks.reduce((prev, curr) => {
    const maxTopicMark = curr.length * config.evaluation.maxMark;
    const candidateTopicMark = curr.reduce((prevInner, currInner) => prevInner + currInner, 0);
    const topicMarkPercent = Math.round((100 * candidateTopicMark) / maxTopicMark);

    return [...prev, topicMarkPercent];
  }, []);

  return normalizedMarks;
};
