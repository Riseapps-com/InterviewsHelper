import { config } from '../../config';
import { englishLevelMap } from '../config';

import type { Grid } from '../../config';

export const evaluateEnglishLevel = (englishDraft: Map<string, number>): string => {
  const totalMark = [...englishDraft.values()].reduce((acc, cur) => acc + cur, 0);
  const levelKey = Object.keys(config.englishEvaluation.grid).find(key => {
    const range = config.englishEvaluation.grid[key as keyof Grid];

    return totalMark >= range.min && totalMark <= range.max;
  });

  return levelKey ? englishLevelMap[levelKey as keyof Grid] : '';
};
