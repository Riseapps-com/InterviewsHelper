import { config } from '../wrappers';

export const normalizeMarks = (marks: number[][]): number[] =>
  marks.reduce((prev, curr) => {
    const maxTopicMark = curr.length * config.maxMark;
    const candidateTopicMark = curr.reduce((prevInner, currInner) => prevInner + currInner, 0);
    const topicMarkPercent = Math.round((100 * candidateTopicMark) / maxTopicMark);

    return [...prev, topicMarkPercent];
  }, []);
