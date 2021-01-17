import config from '../wrappers/config';

const marksToPercentageValues = (marks: number[][]): number[] =>
  marks.reduce((prev, curr) => {
    const maxTopicMark: number = curr.length * config.maxMark;
    const candidateTopicMark: number = curr.reduce(
      (prevInner, currInner) => prevInner + currInner,
      0
    );
    const topicMarkPercent: number = Math.round((100 * candidateTopicMark) / maxTopicMark);

    return [...prev, topicMarkPercent];
  }, []);

export { marksToPercentageValues };
