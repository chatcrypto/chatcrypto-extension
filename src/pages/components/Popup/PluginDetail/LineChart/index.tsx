import React, { useMemo, useRef } from 'react'
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
import { Line, Scatter } from 'react-chartjs-2'

import { Button, Flex, rem } from '@mantine/core'
import { IconRefresh } from '@tabler/icons-react'

import {
  IDateLineChart,
  IPluginDetail,
} from '../../Screens/AnalysisScreen/types'
import { COLORS_CHART } from '../constants'
import { checkType2ParseData } from '../ultils.chart'

// ChartJS.register(
//   zoomPlugin,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// )

ChartJS.register(
  zoomPlugin,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
)

const LineChart = ({ pluginDetail }: { pluginDetail: IPluginDetail }) => {
  // const scaleOpts = {
  //   grid: {
  //     // borderColor: Utils.randomColor(1),
  //     color: 'rgba( 0, 0, 0, 0.1)',
  //   },
  //   title: {
  //     display: true,
  //     // text: (ctx) => ctx.scale.axis + ' axis',
  //   },
  // }
  // const scales: any = {
  //   x: {
  //     type: 'category',
  //     min: 1,
  //     max: 11,
  //   },
  //   y: {
  //     type: 'linear',
  //   },
  // }
  // Object.keys(scales).forEach((scale) =>
  //   Object.assign(scales[scale], scaleOpts),
  // )

  const chartData: IDateLineChart[] = useMemo(() => {
    return pluginDetail.data as IDateLineChart[]
  }, [pluginDetail])

  const options = useMemo(() => {
    return {
      responsive: true,
      // scales: scales,
      scales: {
        x: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value: any, index: number, values: any) {
              console.log(value, index, values)
              return checkType2ParseData(chartData[0].x_field, value)
            },
          },
        },
      },
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
          pan: {
            enabled: true,
            mode: 'xy',
          },
        },
      },
    }
  }, [pluginDetail.title, chartData])

  const data = useMemo(() => {
    return {
      datasets: chartData.map((line, index) => ({
        label: line.label,
        data: line.row_data.map((point) => ({
          x: point[line.x_field],
          y: point[line.y_field],
        })),
        showLine: true,
        fill: false,
        backgroundColor: COLORS_CHART[index],
      })),
    }
  }, [pluginDetail])

  console.log(data, 'data')

  const chartRef = useRef(null)
  const handleResetZoom = () => {
    if (chartRef && chartRef.current) {
      (chartRef.current as any).resetZoom()
    }
  }

  return (
    <Flex direction="column" align="flex-end">
      <Button onClick={handleResetZoom} variant="outline">
        <IconRefresh size={rem(20)} />
      </Button>
      <Scatter options={options as any} data={data} ref={chartRef} />
    </Flex>
  )
}

export default LineChart
