import React, { useMemo, useRef } from 'react'
import {
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

import {
  Button,
  createStyles,
  Flex,
  rem,
  Tooltip as MantineTooltip,
} from '@mantine/core'
import { IconRefresh } from '@tabler/icons-react'

import {
  IDateLineChart,
  IPluginDetail,
} from '../../Screens/AnalysisScreen/types'
import { COLORS_CHART } from '../constants'
import { checkType2ParseData } from '../ultils.chart'

ChartJS.register(
  zoomPlugin,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
)

const useStyles = createStyles(() => ({
  resetIcon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))

const LineChart = ({ pluginDetail }: { pluginDetail: IPluginDetail }) => {

  const chartData: IDateLineChart[] = useMemo(() => {
    return pluginDetail.data as IDateLineChart[]
  }, [pluginDetail])

  const { classes } = useStyles()
  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value: any, index: number, values: any) {
              return checkType2ParseData(chartData[0].x_field, value)
            },
            font: {
              size: 10
            }
          },
          title: {
            display: true,
            text: chartData[0].x_label,
            font: {
              weight: 'bold',
              size: 12
            }
          },
        },
        y: {
          title: {
            display: true,
            text: chartData[0].y_label,
            font: {
              weight: 'bold',
              size: 12
            }
          },
          ticks: {
            font: {
              size: 10
            }
          }
        }
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
        tooltip: {
          callbacks: {
            label: function (context: any) {
              return `${context.dataset.label}: ${checkType2ParseData(
                chartData[0].x_field,
                context.dataset.data[context.dataIndex].x,
              )} : ${context.dataset.data[context.dataIndex].y}`
            },
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
        borderColor: COLORS_CHART[index],
      })),
    }
  }, [pluginDetail])

  const chartRef = useRef(null)
  const handleResetZoom = () => {
    if (chartRef && chartRef.current) {
      (chartRef.current as any).resetZoom()
    }
  }

  return (
    <Flex direction="column" align="flex-end">
      <MantineTooltip label="Reset zoom">
        <IconRefresh
          onClick={handleResetZoom}
          size={rem(16)}
          className={classes.resetIcon}
        />
      </MantineTooltip>
      <Scatter options={options as any} data={data} ref={chartRef} />
    </Flex>
  )
}

export default LineChart
