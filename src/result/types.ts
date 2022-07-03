import type { Grid } from '../config';

export type EnglishLevelMap = {
  [key in keyof Grid]: string;
};
