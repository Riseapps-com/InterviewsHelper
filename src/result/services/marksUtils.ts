export const normalizeMarks = (marks: number[][]): number[] => {
  return marks.reduce((prev, curr) => {
    const candidateTopicMark = curr.reduce((prevInner, currInner) => prevInner + currInner, 0);
    const topicMarkPercent = Math.round(candidateTopicMark / curr.length);

    return [...prev, topicMarkPercent];
  }, []);
};
