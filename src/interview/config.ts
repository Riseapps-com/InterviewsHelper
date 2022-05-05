import type { InterviewStructure } from './types';

export const interviewStructure: InterviewStructure = {
  totalDurationMin: 90,
  topics: {
    javaScript: {
      status: 'required',
      durationMin: 15,
      label: 'JavaScript',
      questionsNumber: 7,
    },
    typeScript: {
      status: 'optional',
      durationMin: 10,
      label: 'TypeScript',
      questionsNumber: 4,
    },
    react: {
      status: 'required',
      durationMin: 20,
      label: 'React',
      questionsNumber: 10,
    },
    reactNative: {
      status: 'required',
      durationMin: 20,
      label: 'React Native',
      questionsNumber: 7,
    },
    angular: {
      status: 'optional',
      durationMin: 20,
      label: 'Angular',
      questionsNumber: 10,
    },
    node: {
      status: 'optional',
      durationMin: 20,
      label: 'Node.js',
      questionsNumber: 10,
    },
    vue: {
      status: 'optional',
      durationMin: 20,
      label: 'Vue.js',
      questionsNumber: 10,
    },
    nativePlatforms: {
      status: 'required',
      durationMin: 10,
      label: 'Native Platforms',
      questionsNumber: 3,
    },
    dataStructuresAndAlgorithms: {
      status: 'optional',
      durationMin: 10,
      label: 'Data structures and algorithms',
      questionsNumber: 3,
    },
    testing: {
      status: 'optional',
      durationMin: 10,
      label: 'Testing',
      questionsNumber: 5,
    },
    softwareSkills: {
      status: 'required',
      durationMin: 10,
      label: 'Software Skills',
      questionsNumber: 5,
    },
    testTasks: {
      status: 'required',
      durationMin: 5,
      label: 'Test Tasks',
      questionsNumber: 1,
    },
    experience: {
      status: 'optional',
      durationMin: 10,
      label: 'Experience',
      questionsNumber: 3,
    },
  },
  requiredSections: ['javaScript', 'react', 'reactNative', 'nativePlatforms', 'communicationSkills', 'testTasks'],
  optionalSections: ['typeScript', 'dataStructuresAndAlgorithms', 'testing', 'other'],
};
