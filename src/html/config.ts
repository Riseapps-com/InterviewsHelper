/* eslint-disable @typescript-eslint/naming-convention */

import type { DatabaseTopicsMap } from './types';

export const QUESTION_DATA_SEPARATOR = ' [';
export const QUESTION_EXTRA_DATA = ']';
export const LOGICAL_AND = '&amp;&amp;';
export const MAIN_CONTENT_KEY = '#main-content';
export const WORDS_TO_IGNORE = ['Links', 'http', 'REACT', 'NATIVE PLATFORMS', 'TESTING'];

export const databaseTopicsMap: DatabaseTopicsMap = {
  JAVASCRIPT: 'javaScript',
  TYPESCRIPT: 'typeScript',
  'REACT BASICS': 'react.basics',
  REDUX: 'react.redux',
  MOBX: 'react.mobx',
  HOOKS: 'react.hooks',
  'REACT ADVANCED': 'react.advanced',
  'APOLLO GRAPHQL': 'react.apolloGraphql',
  'REACT NATIVE': 'reactNative',
  IOS: 'nativePlatforms.ios',
  ANDROID: 'nativePlatforms.android',
  JEST: 'testing.jest',
  DETOX: 'testing.detox',
  'DATA STRUCTURES AND ALGORITHMS': 'dataStructuresAndAlgorithms',
  'COMMUNICATION SKILLS': 'communicationSkills',
  'TEST TASKS': 'testTasks',
  OTHER: 'other',
};
