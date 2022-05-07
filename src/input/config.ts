/* eslint-disable @typescript-eslint/naming-convention */

import type { InterviewTopics } from './types';
import type { Choice } from 'prompts';

const BASE_FIRST: Choice[] = [
  { title: '(*) Java Script', value: 'javaScript' },
  { title: '(*) Type Script', value: 'typeScript' },
];
const BASE_SECOND: Choice[] = [
  { title: 'Testing: Jest', value: 'testing.jest' },
  { title: 'Data Structures And Algorithms', value: 'dataStructuresAndAlgorithms' },
  { title: '(*) Software Skills', value: 'softwareSkills' },
  { title: '(*) Test Tasks', value: 'testTasks' },
  { title: 'Experience', value: 'experience' },
];
const BASE_REACT: Choice[] = [
  { title: '(*) React: Basics', value: 'react.basics' },
  { title: '(*) React: Redux', value: 'react.redux' },
  { title: '(*) React: Hooks', value: 'react.hooks' },
  { title: 'React: Advanced', value: 'react.advanced' },
  { title: 'React: Graphql', value: 'react.apolloGraphql' },
];
const BASE_REACT_NATIVE: Choice[] = [
  ...BASE_REACT,
  { title: '(*) React Native', value: 'reactNative' },
  { title: '(*) Native Platforms: iOS', value: 'nativePlatforms.ios' },
  { title: '(*) Native Platforms: Android', value: 'nativePlatforms.android' },
  { title: 'Testing: Detox', value: 'testing.detox' },
];
const BASE_ANGULAR: Choice[] = [{ title: '(*) Angular', value: 'angular' }];
const BASE_VUE: Choice[] = [{ title: '(*) Vue.js', value: 'vue' }];
const BASE_NODE: Choice[] = [{ title: '(*) Node.js', value: 'node' }];

const REACT: Choice[] = [...BASE_FIRST, ...BASE_REACT, ...BASE_SECOND];
const REACT_NATIVE: Choice[] = [...BASE_FIRST, ...BASE_REACT_NATIVE, ...BASE_SECOND];
const ANGULAR: Choice[] = [...BASE_FIRST, ...BASE_ANGULAR, ...BASE_SECOND];
const VUE: Choice[] = [...BASE_FIRST, ...BASE_VUE, ...BASE_SECOND];
const NODE: Choice[] = [...BASE_FIRST, ...BASE_NODE, ...BASE_SECOND];

const REACT_NODE: Choice[] = [...BASE_FIRST, ...BASE_NODE, ...BASE_REACT, ...BASE_SECOND];
const REACT_NATIVE_NODE: Choice[] = [...BASE_FIRST, ...BASE_NODE, ...BASE_REACT_NATIVE, ...BASE_SECOND];
const ANGULAR_NODE: Choice[] = [...BASE_FIRST, ...BASE_NODE, ...BASE_ANGULAR, ...BASE_SECOND];
const VUE_NODE: Choice[] = [...BASE_FIRST, ...BASE_NODE, ...BASE_VUE, ...BASE_SECOND];

export const INTERVIEW_TOPICS: InterviewTopics = {
  react: REACT,
  reactNative: REACT_NATIVE,
  angular: ANGULAR,
  vue: VUE,
  node: NODE,
  'react+node': REACT_NODE,
  'reactNative+node': REACT_NATIVE_NODE,
  'angular+node': ANGULAR_NODE,
  'vue+node': VUE_NODE,
};

export const DEFAULT_INTERVIEWER_FIRSTNAME = 'Dmitry';
export const DEFAULT_INTERVIEWER_LASTNAME = 'Usik';
export const DEFAULT_INTERVIEWER_EMAIL = 'd.usik@riseapps.biz';
export const DEFAULT_INTERVIEWER_LINKEDIN = 'https://www.linkedin.com/in/dmitry-usik-a29479132/';
