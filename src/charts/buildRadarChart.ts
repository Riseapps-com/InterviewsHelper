import fs from 'fs';
import fetch, { Response } from 'node-fetch';
import QuickChart from 'quickchart-js';

import { wrapToOutputsDirectory } from '../utils/createOutputsDirectory';
import { marksToPercentageValues } from '../utils/marksToPercentageValues';
import config from '../wrappers/config';

const buildRadarChart = async (resultDraft: Map<string, number[]>): Promise<void> => {
  console.log(`buildRadarChart(${[...resultDraft.keys()]})`);

  const radarChart = new QuickChart();

  radarChart.setWidth(config.radarChart.width);
  radarChart.setConfig({
    type: 'radar',
    data: {
      labels: [...resultDraft.keys()],
      datasets: [
        {
          label: 'Result',
          data: marksToPercentageValues([...resultDraft.values()]),
          backgroundColor: config.radarChart.datasetBackgroundColor,
          pointBorderColor: config.radarChart.datasetColor,
          pointBackgroundColor: config.radarChart.datasetColor,
          borderColor: config.radarChart.datasetColor,
        },
      ],
    },
    options: {
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

  fs.writeFileSync(wrapToOutputsDirectory(config.radarChartFilename), await response.buffer());
};

export { buildRadarChart };
