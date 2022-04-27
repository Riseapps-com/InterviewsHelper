import fs from 'fs';
import prompts from 'prompts';

import { config } from '../../config';
import {
  DEFAULT_INTERVIEWER_EMAIL,
  DEFAULT_INTERVIEWER_FIRSTNAME,
  DEFAULT_INTERVIEWER_LASTNAME,
  DEFAULT_INTERVIEWER_LINKEDIN,
  INTERVIEW_TOPICS,
} from '../config';

import type { Input, InterviewType } from '../types';

export const generateInput = async (): Promise<void> => {
  console.log('generateInput()');

  const interviewTypeResponse = await prompts({
    type: 'select',
    name: 'interviewType',
    message: 'Select interview type',
    choices: [
      { title: 'React', value: 'react' },
      { title: 'React-Native', value: 'reactNative' },
      { title: 'Angular', value: 'angular' },
      { title: 'Node', value: 'node' },
    ],
  });
  const response = await prompts([
    {
      type: 'select',
      name: 'interviewMode',
      message: 'Select interview mode',
      choices: [
        { title: 'Department', value: 'department' },
        { title: 'Partnership', value: 'partnership' },
      ],
    },
    {
      type: 'multiselect',
      name: 'interviewTopics',
      message: 'Select interview topics',
      choices: INTERVIEW_TOPICS[interviewTypeResponse.interviewType as InterviewType],
    },
    {
      type: 'text',
      name: 'candidateFirstname',
      message: 'Enter candidate firstname',
      initial: '-',
    },
    {
      type: 'text',
      name: 'candidateLastname',
      message: 'Enter candidate lastname',
      initial: '-',
    },
    {
      type: 'text',
      name: 'candidateEmail',
      message: 'Enter candidate email',
      initial: '-',
    },
    {
      type: 'select',
      name: 'candidateSupposedLevel',
      message: 'Select candidate supposed level',
      choices: [
        { title: 'Junior', value: 'junior' },
        { title: 'Junior+', value: 'junior+' },
        { title: 'Middle-', value: 'middle-' },
        { title: 'Middle', value: 'middle' },
        { title: 'Middle+', value: 'middle+' },
        { title: 'Senior', value: 'senior' },
      ],
    },
    {
      type: 'text',
      name: 'interviewerFirstname',
      message: 'Enter interviewer firstname',
      initial: DEFAULT_INTERVIEWER_FIRSTNAME,
    },
    {
      type: 'text',
      name: 'interviewerLastname',
      message: 'Enter interviewer lastname',
      initial: DEFAULT_INTERVIEWER_LASTNAME,
    },
    {
      type: 'text',
      name: 'interviewerEmail',
      message: 'Enter interviewer email',
      initial: DEFAULT_INTERVIEWER_EMAIL,
    },
    {
      type: 'text',
      name: 'interviewerLinkedin',
      message: 'Enter interviewer linkedin',
      initial: DEFAULT_INTERVIEWER_LINKEDIN,
    },
  ]);
  const useQuestionSetsResponse = await prompts({
    type: 'confirm',
    name: 'useQuestionSets',
    message: 'Would you like to use ready-to-use question sets?',
    initial: true,
  });

  const input: Input = {
    interview: {
      type: interviewTypeResponse.interviewType,
      mode: response.interviewMode,
      topics: response.interviewTopics,
    },
    candidate: {
      firstname: response.candidateFirstname,
      lastname: response.candidateLastname,
      email: response.candidateEmail,
      supposedLevel: response.candidateSupposedLevel,
    },
    interviewer: {
      firstname: response.interviewerFirstname,
      lastname: response.interviewerLastname,
      email: response.interviewerEmail,
      linkedin: response.interviewerLinkedin,
    },
    useQuestionSets: useQuestionSetsResponse.useQuestionSets,
  };

  fs.writeFileSync(config.files.configFilename, JSON.stringify(input));
};

export const getInput = (): Input => {
  const input = JSON.parse(fs.readFileSync(config.files.configFilename, 'utf-8'));

  if (!input) throw new Error('Input should be specified.');

  return input;
};
