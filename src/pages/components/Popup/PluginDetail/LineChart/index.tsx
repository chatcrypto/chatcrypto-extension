import React, { useMemo } from 'react'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import { Line } from 'react-chartjs-2'

import { IPluginDetail } from '../../Screens/AnalysisScreen/types'
import { checkType2ParseData } from '../ultils.chart'

ChartJS.register(
  zoomPlugin,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const LineChart = ({ pluginDetail }: { pluginDetail: IPluginDetail }) => {
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
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'xy',
          },
        },
      },
    }
  }, [pluginDetail.title])

  // const labels = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  // ]

  const data = useMemo(() => {
    return {
      labels: pluginDetail.data[0].row_data.map((d) =>
        checkType2ParseData(
          pluginDetail.data[0].x_field,
          d[pluginDetail.data[0].x_field],
        ),
      ),
      datasets: pluginDetail.data.map((line) => ({
        label: line.label,
        data: line.row_data.map((point) => point[pluginDetail.data[0].y_field]),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      })),
    }
  }, [pluginDetail])

  return <Line options={options as any} data={data} />
}

export default LineChart
