import axios from 'axios';
import fs from 'fs';
import QuickChart from 'quickchart-js';

import { config } from '../../config';
import { fsUtils } from '../../fs';

export const buildRadarChart = async (data: Map<string, number>, label: string, filename: string): Promise<void> => {
  const radarChart = new QuickChart();

  radarChart.setWidth(config.radarChart.width);
  radarChart.setConfig({
    type: 'radar',
    data: {
      labels: [...data.keys()],
      datasets: [
        {
          label,
          data: [...data.values()],
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
          suggestedMax: 5,
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

  fs.writeFileSync(fsUtils.wrapToOutputDirectory(filename), response.data);
};
