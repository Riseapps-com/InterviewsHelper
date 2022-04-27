import type { InterviewTopics } from './types';
import type { Choice } from 'prompts';

const TOPICS_BASE: Choice[] = [
  { title: 'Java Script', value: 'javaScript' },
  { title: 'Type Script', value: 'typeScript' },
  { title: 'Testing: Jest', value: 'testings.jest' },
  { title: 'Data Structures And Algorithms', value: 'dataStructuresAndAlgorithms' },
  { title: 'Communications Skills', value: 'communicationSkills' },
  { title: 'Test Tasks', value: 'testTasks' },
];
const TOPICS_REACT: Choice[] = [
  { title: 'React: Basics', value: 'react.basics' },
  { title: 'React: Redux', value: 'react.redux' },
  { title: 'React: Mobx', value: 'react.mobx' },
  { title: 'React: Hooks', value: 'react.hooks' },
  { title: 'React: Advanced', value: 'react.advanced' },
  { title: 'React: Graphql', value: 'react.apolloGraphql' },
];
const INTERVIEW_TOPICS_REACT: Choice[] = [...TOPICS_BASE, ...TOPICS_REACT];
const INTERVIEW_TOPICS_REACT_NATIVE: Choice[] = [
  ...TOPICS_BASE,
  ...TOPICS_REACT,
  { title: 'React Native', value: 'reactNative' },
  { title: 'Native Platforms: iOS', value: 'nativePlatforms.ios' },
  { title: 'Native Platforms: Android', value: 'nativePlatforms.android' },
  { title: 'Testing: Detox', value: 'testing.detox' },
];
const INTERVIEW_TOPICS_ANGULAR: Choice[] = [...TOPICS_BASE, { title: 'Angular', value: 'angular' }];
const INTERVIEW_TOPICS_NODE: Choice[] = [...TOPICS_BASE, { title: 'Node.js', value: 'node' }];

export const INTERVIEW_TOPICS: InterviewTopics = {
  react: INTERVIEW_TOPICS_REACT,
  reactNative: INTERVIEW_TOPICS_REACT_NATIVE,
  angular: INTERVIEW_TOPICS_ANGULAR,
  node: INTERVIEW_TOPICS_NODE,
};

export const DEFAULT_INTERVIEWER_FIRSTNAME = 'Dmitry';
export const DEFAULT_INTERVIEWER_LASTNAME = 'Usik';
export const DEFAULT_INTERVIEWER_EMAIL = 'd.usik@riseapps.biz';
export const DEFAULT_INTERVIEWER_LINKEDIN = 'https://www.linkedin.com/in/dmitry-usik-a29479132/';
