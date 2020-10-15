import QuickChart from 'quickchart-js'
import fetch, { Response } from 'node-fetch'
import fs from 'fs'
import config from './config'
import { wrapToOutputsDirectory } from './createOutputsDirectory'

const marksToRadarChartValues = (marks: number[][]): number[] =>
    marks.reduce((prev, curr) => {
        const maxTopicMark: number = curr.length * config.maxMark
        const candidateTopicMark: number = curr.reduce((prev, curr) => prev + curr, 0)
        const topicMarkPercent: number = Math.round((100 * candidateTopicMark) / maxTopicMark)

        return [...prev, topicMarkPercent]
    }, [])

const buildRadarChart = async (resultDraft: Map<string, number[]>): Promise<void> => {
    console.log(`buildRadarChart(${[...resultDraft.keys()]})`)

    const radarChart = new QuickChart()
    radarChart.setWidth(config.radarChart.width)
    radarChart.setConfig({
        type: 'radar',
        data: {
            labels: [...resultDraft.keys()],
            datasets: [
                {
                    label: 'Result',
                    data: marksToRadarChartValues([...resultDraft.values()]),
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
    })

    const response: Response = await fetch(radarChart.getUrl())
    fs.writeFileSync(wrapToOutputsDirectory(config.radarChartFilename), await response.buffer())
}

export { buildRadarChart }
