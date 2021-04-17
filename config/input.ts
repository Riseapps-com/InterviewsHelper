import { Input } from '../src/types';

export const input: Input = {
  // Can be:
  // - javaScript
  // - typeScript
  // - react.basics, react.redux, react.mobx, react.hooks, react.advanced, react.apolloGraphql
  // - reactNative
  // - nativePlatforms.ios, nativePlatforms.android
  // - testing.jest, testing.detox
  // - dataStructuresAndAlgorithms
  // - communicationSkills
  // - testTasks
  // - other
  includedTopics: [
    'javaScript',
    'typeScript',
    'react.basics',
    'react.mobx',
    'react.hooks',
    'react.advanced',
    'reactNative',
    'nativePlatforms.ios',
    'nativePlatforms.android',
    'communicationSkills',
    'testTasks',
  ],
  candidate: {
    firstname: 'Elon',
    lastname: 'Musk',
    // If you don't have required information the just left this field empty
    email: 'nasales@tesla.com',
    // Can be: junior | junior+ | middle- | middle | middle+ | senior
    supposedLevel: 'middle+',
  },
  interviewer: {
    firstname: 'Dmitry',
    lastname: 'Usik',
    // If you don't have required information the just left these fields empty
    email: 'd.usik@riseapps.biz',
    linkedin: 'https://www.linkedin.com/in/dmitry-usik-a29479132/',
  },
};
