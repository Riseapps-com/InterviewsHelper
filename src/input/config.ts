import type { InterviewTopics } from './types';
import type { Choice } from 'prompts';

const TOPICS_BASE_FIRST: Choice[] = [
  { title: 'Java Script', value: 'javaScript' },
  { title: 'Type Script', value: 'typeScript' },
];
const TOPICS_BASE_SECOND: Choice[] = [
  { title: 'Testing: Jest', value: 'testing.jest' },
  { title: 'Data Structures And Algorithms', value: 'dataStructuresAndAlgorithms' },
  { title: 'Software Skills', value: 'softwareSkills' },
  { title: 'Test Tasks', value: 'testTasks' },
  { title: 'Experience', value: 'experience' },
];
const TOPICS_REACT: Choice[] = [
  { title: 'React: Basics', value: 'react.basics' },
  { title: 'React: Redux', value: 'react.redux' },
  { title: 'React: Hooks', value: 'react.hooks' },
  { title: 'React: Advanced', value: 'react.advanced' },
  { title: 'React: Graphql', value: 'react.apolloGraphql' },
];
const INTERVIEW_TOPICS_REACT: Choice[] = [...TOPICS_BASE_FIRST, ...TOPICS_REACT, ...TOPICS_BASE_SECOND];
const INTERVIEW_TOPICS_REACT_NATIVE: Choice[] = [
  ...TOPICS_BASE_FIRST,
  ...TOPICS_REACT,
  { title: 'React Native', value: 'reactNative' },
  { title: 'Native Platforms: iOS', value: 'nativePlatforms.ios' },
  { title: 'Native Platforms: Android', value: 'nativePlatforms.android' },
  { title: 'Testing: Detox', value: 'testing.detox' },
  ...TOPICS_BASE_SECOND,
];
const INTERVIEW_TOPICS_ANGULAR: Choice[] = [
  ...TOPICS_BASE_FIRST,
  { title: 'Angular', value: 'angular' },
  ...TOPICS_BASE_SECOND,
];
const INTERVIEW_TOPICS_NODE: Choice[] = [
  ...TOPICS_BASE_FIRST,
  { title: 'Node.js', value: 'node' },
  ...TOPICS_BASE_SECOND,
];
const INTERVIEW_TOPICS_VUE: Choice[] = [...TOPICS_BASE_FIRST, { title: 'Vue.js', value: 'vue' }, ...TOPICS_BASE_SECOND];

export const INTERVIEW_TOPICS: InterviewTopics = {
  react: INTERVIEW_TOPICS_REACT,
  reactNative: INTERVIEW_TOPICS_REACT_NATIVE,
  angular: INTERVIEW_TOPICS_ANGULAR,
  node: INTERVIEW_TOPICS_NODE,
  vue: INTERVIEW_TOPICS_VUE,
};

export const DEFAULT_INTERVIEWER_FIRSTNAME = 'Dmitry';
export const DEFAULT_INTERVIEWER_LASTNAME = 'Usik';
export const DEFAULT_INTERVIEWER_EMAIL = 'd.usik@riseapps.biz';
export const DEFAULT_INTERVIEWER_LINKEDIN = 'https://www.linkedin.com/in/dmitry-usik-a29479132/';
