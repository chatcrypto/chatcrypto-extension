import React, { useMemo } from 'react'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'

import {
  IDatePieChart,
  IPluginDetail,
} from '../../Screens/AnalysisScreen/types'
import { COLORS_CHART } from '../constants'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = ({ pluginDetail }: { pluginDetail: IPluginDetail }) => {
  const options = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
          // align: 'start',
        },
        title: {
          display: true,
          text: pluginDetail.title,
          // align: 'start',
          font: {
            weight: 'bold',
            size: 16,
          },
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              return `${context.dataset.label}: ${
                context.dataset.rawData[context.dataIndex]
              }`
            },
          },
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
        rawData: chartData[0].row_data,
        backgroundColor: COLORS_CHART,
        borderWidth: 1,
      },
    ],
  }

  return (
    <Pie
      data={data}
      options={options as any}
    />
  )
}

export default PieChart
