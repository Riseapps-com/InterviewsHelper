import axios from 'axios';
import fs from 'fs';
import QuickChart from 'quickchart-js';

import { config } from '../../config';
import { fsUtils } from '../../fs';
import { inputUtils } from '../../input';
import { interviewStructure, interviewUtils } from '../../interview';
import { marksUtils } from '../../result';

import type { TopicDuration } from '../../interview';

export const getTopicDurations = (topics: string[]): TopicDuration[] => {
  return topics.reduce((curr: TopicDuration[], prev) => {
    let topicDuration: TopicDuration;

    if (prev.split('.').length > 1) {
      const keys = prev.split('.');
      const topLevelTopic = keys[0];

      topicDuration = interviewStructure.topics[topLevelTopic];
    } else {
      topicDuration = interviewStructure.topics[prev];
    }

    return curr.includes(topicDuration) ? [...curr] : [...curr, topicDuration];
  }, []);
};

export const buildPieChart = async (): Promise<void> => {
  const topicDurations = getTopicDurations(inputUtils.getInput().interview.topics);
  const interviewDuration = interviewUtils.calculateInterviewDuration(topicDurations);

  const pieChart = new QuickChart();

  pieChart.setWidth(config.pieChart.width);
  pieChart.setConfig({
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: topicDurations.map(topicDuration => topicDuration.durationMin),
          backgroundColor: config.pieChart.dataColors,
          label: 'Main Dataset',
        },
      ],
      labels: topicDurations.map(topicDuration => topicDuration.label),
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

  const response = await axios({
    url: pieChart.getUrl(),
    method: 'get',
    responseType: 'arraybuffer',
  });

  fs.writeFileSync(fsUtils.wrapToOutputDirectory(config.files.pieChartFilename), response.data);
};

export const buildRadarChart = async (resultDraft: Map<string, number[]>): Promise<void> => {
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

  const response = await axios({
    url: radarChart.getUrl(),
    method: 'get',
    responseType: 'arraybuffer',
  });

  fs.writeFileSync(fsUtils.wrapToOutputDirectory(config.files.radarChartFilename), response.data);
};
