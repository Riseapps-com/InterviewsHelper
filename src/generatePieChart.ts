import fetch, { Response } from 'node-fetch'
import fs from 'fs'
import { Topic, TopicDurationForChart } from './types'
import interview from './interview.json'

const pieChartFilename: string = 'pieChart.png'

const chartColors: string[] = [
    'rgb(254,74,73)',
    'rgb(42,183,202)',
    'rgb(254,215,102)',
    'rgb(246,171,182)',
    'rgb(0,91,150)',
    'rgb(123,192,67)',
    'rgb(243,119,54)',
    'rgb(255,119,170)',
    'rgb(133,68,66)',
]

const generatePieChart = async (topics: Topic[]) => {
    console.log(`generatePieChart([${topics}])`)

    const topicDurations: TopicDurationForChart[] = topics.reduce((curr, prev) => {
        let topicDuration: TopicDurationForChart
        if (
            prev === 'reactBasics' ||
            prev === 'redux' ||
            prev === 'mobx' ||
            prev === 'hooks' ||
            prev === 'reactAdvanced' ||
            prev === 'apolloGraphql'
        ) {
            topicDuration = interview.react
        } else if (prev === 'jest' || prev === 'detox') {
            topicDuration = interview.testing
        } else {
            topicDuration = interview[prev]
        }
        return [...curr, topicDuration]
    }, [])

    const chartData = {
        type: 'doughnut',
        data: {
            datasets: [
                {
                    data: topicDurations.map((topicDuration) => topicDuration.durationMin),
                    backgroundColor: chartColors,
                    label: 'Main Dataset',
                },
            ],
            labels: topicDurations.map((topicDuration) => topicDuration.label),
        },
        options: {
            title: {
                display: false,
            },
            plugins: {
                datalabels: {
                    display: true,
                    font: {
                        size: 10,
                        weight: 'bold',
                    },
                },
                doughnutlabel: {
                    labels: [
                        { text: interview.totalDurationMin, font: { size: 20, weight: 'bold' } },
                        { text: 'min' },
                    ],
                },
            },
        },
    }

    const response: Response = await fetch(
        `https://quickchart.io/chart?bkg=white&c=${JSON.stringify(chartData)}`,
    )
    fs.writeFileSync(pieChartFilename, await response.buffer())
}

export { generatePieChart, pieChartFilename }
