import QuickChart from 'quickchart-js'
import fetch, { Response } from 'node-fetch'
import fs from 'fs'
import config from './config'
import { parseResultDraft } from './parseResultDraft'

const buildRadarChart = async (): Promise<void> => {
    console.log('buildRadarChart()')

    const parsedResultDraft = parseResultDraft()

    const radarChart = new QuickChart()
    radarChart.setConfig({
        type: 'radar',
        data: {
            labels: [...parsedResultDraft.keys()],
            datasets: [
                {
                    data: [...parsedResultDraft.values()].map(
                        (topicMarks) =>
                            (100 * topicMarks.reduce((prev, curr) => prev + curr, 0)) /
                            topicMarks.reduce((prev) => prev + 5, 0),
                    ),
                },
            ],
        },
    })

    const response: Response = await fetch(radarChart.getUrl())
    fs.writeFileSync(config.radarChartFilepath, await response.buffer())
}

export { buildRadarChart }
