import { config } from '../config';

import type { DatabaseTopicsMap } from './types';

export const QUESTION_DATA_SEPARATOR = ' [';
export const QUESTION_EXTRA_DATA = ']';
export const LOGICAL_AND = '&amp;&amp;';
export const MAIN_CONTENT_KEY = '#main-content';

export const databaseTopicsMap: DatabaseTopicsMap = {
  [config.files.database.angularPath]: 'angular',
  [config.files.database.dataStructuresAndAlgorithmsPath]: 'dataStructuresAndAlgorithms',
  [config.files.database.experiencePath]: 'experience',
  [config.files.database.javaScriptPath]: 'javaScript',
  [config.files.database.nativePlatformsAndroidPath]: 'nativePlatforms.android',
  [config.files.database.nativePlatformsIosPath]: 'nativePlatforms.ios',
  [config.files.database.nodePath]: 'node',
  [config.files.database.reactAdvancedPath]: 'react.advanced',
  [config.files.database.reactApolloPath]: 'react.apolloGraphql',
  [config.files.database.reactBasicsPath]: 'react.basics',
  [config.files.database.reactHooksPath]: 'react.hooks',
  [config.files.database.reactReduxPath]: 'react.redux',
  [config.files.database.reactNativePath]: 'reactNative',
  [config.files.database.softwareSkillsPath]: 'softwareSkills',
  [config.files.database.testingPathDetox]: 'testing.detox',
  [config.files.database.testingPathJest]: 'testing.jest',
  [config.files.database.testTasksPath]: 'testTasks',
  [config.files.database.typeScriptPath]: 'typeScript',
  [config.files.database.vuePath]: 'vue',
};
