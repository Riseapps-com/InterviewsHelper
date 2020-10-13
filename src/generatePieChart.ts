import fetch, { Response } from 'node-fetch'
import fs from 'fs'
import { pieChartFilepath, Topic, TopLevelTopic } from './config'
import { TopicDuration } from './types'
import interview from './interview'
import QuickChart from 'quickchart-js'

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

const chartTextColor: string = 'rgb(74,78,77)'

const getTopicDurations = (topics: Topic[]): TopicDuration[] =>
    topics.reduce((curr, prev) => {
        let topicDuration: TopicDuration

        if (prev.split('.').length > 1) {
            const keys: string[] = prev.split('.')
            const topLevelTopic: TopLevelTopic = keys[0] as TopLevelTopic
            topicDuration = interview.topics[topLevelTopic]
        } else {
            const topLevelTopic: TopLevelTopic = prev as TopLevelTopic
            topicDuration = interview.topics[topLevelTopic]
        }

        return curr.includes(topicDuration) ? [...curr] : [...curr, topicDuration]
    }, [])

const generatePieChart = async (topics: Topic[]) => {
    console.log(`generatePieChart([${topics}])`)

    const topicDurations: TopicDuration[] = getTopicDurations(topics)

    const pieChart = new QuickChart()
    pieChart.setConfig({
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
            legend: {
                display: true,
                align: 'center',
                labels: {
                    fontColor: chartTextColor,
                    fontSize: 12,
                    fontStyle: 'bold',
                },
            },
            plugins: {
                datalabels: {
                    display: true,
                    font: {
                        size: 16,
                        weight: 'bold',
                    },
                    color: chartTextColor,
                },
                doughnutlabel: {
                    labels: [
                        {
                            text: interview.totalDurationMin,
                            font: { size: 32, weight: 'bold' },
                            color: chartTextColor,
                        },
                        { text: 'min', font: { size: 16, weight: 'bold' }, color: chartTextColor },
                    ],
                },
            },
        },
    })

    const response: Response = await fetch(pieChart.getUrl())
    fs.writeFileSync(pieChartFilepath, await response.buffer())
}

export { generatePieChart }
