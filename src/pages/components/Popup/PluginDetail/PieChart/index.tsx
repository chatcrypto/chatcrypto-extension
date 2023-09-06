import React, { useMemo } from 'react'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'

import {
  IDatePieChart,
  IPluginDetail,
} from '../../Screens/AnalysisScreen/types'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = ({ pluginDetail }: { pluginDetail: IPluginDetail }) => {
  const options = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: pluginDetail.title,
        },
      },
    }
  }, [pluginDetail.title])

  const chartData: IDatePieChart[] = useMemo(() => {
    return pluginDetail.data as IDatePieChart[]
  }, [pluginDetail])

  const totalData = useMemo(() => {
    return chartData[0].row_data.reduce(function (a, b) {
      return a + b
    })
  }, [chartData])

  const data = {
    labels: chartData[0].label,
    datasets: [
      {
        label: pluginDetail.title,
        data: chartData[0].row_data.map((r) =>
          Number(((100 * r) / totalData).toFixed(2)),
        ),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return <Pie data={data} options={options} />
}

export default PieChart
