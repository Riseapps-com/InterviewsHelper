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
import type { Choice } from 'prompts';

export const generateInput = async (): Promise<void> => {
  const interviewTypeChoices: Choice[] = [
    { title: 'React', value: 'react' },
    { title: 'React-Native', value: 'reactNative' },
    { title: 'Angular', value: 'angular' },
    { title: 'Vue.js', value: 'vue' },
    { title: 'Node.js', value: 'node' },
    { title: 'React + Node.js', value: 'react+node' },
    { title: 'React-Native + Node.js', value: 'reactNative+node' },
    { title: 'Angular + Node.js', value: 'angular+node' },
    { title: 'Vue.js + Node.js', value: 'vue+node' },
  ];
  const interviewTypeResponse = await prompts({
    type: 'select',
    name: 'interviewType',
    message: 'Select interview type',
    choices: interviewTypeChoices,
  });
  const interviewModeChoices: Choice[] = [
    { title: 'Department', value: 'department' },
    { title: 'Partnership', value: 'partnership' },
  ];
  const response = await prompts([
    {
      type: 'select',
      name: 'interviewMode',
      message: 'Select interview mode',
      choices: interviewModeChoices,
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
      typeLabel: interviewTypeChoices.find(item => item.value === interviewTypeResponse.interviewType)?.title,
      mode: response.interviewMode,
      modeLabel: interviewModeChoices.find(item => item.value === response.interviewMode)?.title,
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

  fs.writeFileSync(config.files.interview.inputFilename, JSON.stringify(input));
};

export const getInput = (): Input => {
  const input = JSON.parse(fs.readFileSync(config.files.interview.inputFilename, 'utf-8'));

  if (!input) throw new Error('Generate input at first.');

  return input;
};

export const parseInterviewType = (interviewType: InterviewType): string[] => {
  const interviewTypeSplit = interviewType.split('+');

  return interviewTypeSplit.filter(item => !!item);
};
