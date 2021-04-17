import fs from 'fs';
import fetch, { Response } from 'node-fetch';
import QuickChart from 'quickchart-js';

import { config, input } from '../../config';
import { interviewStructure } from '../../data';
import { TopicDuration } from '../types';
import { fsUtils } from './index';
import * as marksUtils from './marksUtils';

export const calculateInterviewDuration = (topicsDurations: TopicDuration[]) => {
  const interviewDuration = topicsDurations.reduce((prev, curr) => prev + curr.durationMin, 0);

  return interviewDuration;
};

export const getTopicsDurations = (topics: string[]): TopicDuration[] => {
  const topicsDuration = topics.reduce((curr: TopicDuration[], prev) => {
    let topicDuration: TopicDuration;

    if (prev.split('.').length > 1) {
      const keys: string[] = prev.split('.');
      const topLevelTopic: string = keys[0];

      topicDuration = interviewStructure.topics[topLevelTopic];
    } else {
      topicDuration = interviewStructure.topics[prev];
    }

    return curr.includes(topicDuration) ? [...curr] : [...curr, topicDuration];
  }, []);

  return topicsDuration;
};

export const buildPieChart = async () => {
  console.log(`buildPieChart()`);

  const topicsDurations = getTopicsDurations(input.includedTopics);
  const interviewDuration = calculateInterviewDuration(topicsDurations);

  const pieChart = new QuickChart();

  pieChart.setWidth(config.pieChart.width);

  pieChart.setConfig({
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: topicsDurations.map(topicDuration => topicDuration.durationMin),
          backgroundColor: config.pieChart.dataColors,
          label: 'Main Dataset',
        },
      ],
      labels: topicsDurations.map(topicDuration => topicDuration.label),
    },
    options: {
      title: {
        display: false,
      },
      legend: {
        display: true,
        align: 'center',
        labels: {
          fontColor: config.pieChart.fontColor,
          fontSize: config.pieChart.fontSize,
          fontStyle: config.pieChart.fontStyle,
        },
      },
      plugins: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        datalabels: {
          display: true,
          font: {
            size: config.pieChart.fontSize,
            weight: config.pieChart.fontStyle,
          },
          color: config.pieChart.dataFontColor,
        },
        doughnutlabel: {
          labels: [
            {
              text: interviewDuration,
              font: {
                size: config.pieChart.centerFontSize,
                weight: config.pieChart.fontStyle,
              },
              color: config.pieChart.fontColor,
            },
            {
              text: 'min',
              font: {
                size: config.pieChart.fontSize,
                weight: config.pieChart.fontStyle,
              },
              color: config.pieChart.fontColor,
            },
          ],
        },
      },
    },
  });

  const response: Response = await fetch(pieChart.getUrl());

  fs.writeFileSync(
    fsUtils.wrapToOutputDirectory(config.files.pieChartFilename),
    await response.buffer()
  );
};

export const buildRadarChart = async (resultDraft: Map<string, number[]>) => {
  console.log(`buildRadarChart(${[...resultDraft.keys()]})`);

  const radarChart = new QuickChart();

  radarChart.setWidth(config.radarChart.width);
  radarChart.setConfig({
    type: 'radar',
    data: {
      labels: [...resultDraft.keys()],
      datasets: [
        {
          label: 'Topics',
          data: marksUtils.normalizeMarks([...resultDraft.values()]),
          backgroundColor: config.radarChart.datasetBackgroundColor,
          pointBorderColor: config.radarChart.datasetColor,
          pointBackgroundColor: config.radarChart.datasetColor,
          borderColor: config.radarChart.datasetColor,
        },
      ],
    },
    options: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      title: {
        display: false,
      },
      legend: {
        display: true,
        align: 'center',
        labels: {
          fontColor: config.radarChart.fontColor,
          fontSize: config.radarChart.legendFontSize,
          fontStyle: config.radarChart.fontStyle,
        },
      },
      scale: {
        angleLines: {
          display: true,
          color: config.radarChart.gridColor,
        },
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100,
          fontColor: config.radarChart.fontColor,
          fontSize: config.radarChart.fontSize,
          fontStyle: config.radarChart.fontStyle,
          backdropColor: config.radarChart.ticksBackgroundColor,
        },
        pointLabels: {
          fontColor: config.radarChart.fontColor,
          fontSize: config.radarChart.fontSize,
          fontStyle: config.radarChart.fontStyle,
        },
        gridLines: {
          color: config.radarChart.gridColor,
        },
      },
    },
  });

  const response: Response = await fetch(radarChart.getUrl());

  fs.writeFileSync(
    fsUtils.wrapToOutputDirectory(config.files.radarChartFilename),
    await response.buffer()
  );
};
