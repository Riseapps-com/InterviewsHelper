import startCase from 'lodash.startcase';

export const topicToKey = (topic: string): string =>
  topic
    .split('.')
    .map(item =>
      startCase(item)
        .split(' ')
        .map(word => word[0].toLowerCase())
        .join('')
    )
    .join('.');
