import React, { useMemo, useRef } from 'react'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom'
import { Bar } from 'react-chartjs-2'

import {
  createStyles,
  Flex,
  rem,
  Tooltip as MantineTooltip,
} from '@mantine/core'
import { IconRefresh } from '@tabler/icons-react'

import {
  IDateBarChart,
  IPluginDetail,
} from '../../Screens/AnalysisScreen/types'
import { COLORS_CHART } from '../constants'
import { checkType2ParseData } from '../ultils.chart'

const useStyles = createStyles(() => ({
  resetIcon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))

ChartJS.register(
  zoomPlugin,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

const GroupedBarChart = ({ pluginDetail }: { pluginDetail: IPluginDetail }) => {
  const chartData: IDateBarChart[] = useMemo(() => {
    return pluginDetail.data as IDateBarChart[]
  }, [pluginDetail])

  const { classes } = useStyles()

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
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: chartData[0].x_label,
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
        },
        y: {
          stacked: true,
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
        },
      },
    }
  }, [pluginDetail, chartData])

  const data = useMemo(() => {
    return {
      labels: chartData[0].row_data.map((stack) =>
        checkType2ParseData(chartData[0].x_field, stack[chartData[0].x_field]),
      ),
      datasets: chartData.map((bar, index) => ({
        label: bar.label,
        data: bar.row_data.map((stack) => stack[chartData[0].y_field]),
        backgroundColor: COLORS_CHART[index],
      })),
    }
  }, [chartData])

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
      <Bar options={options as any} data={data} ref={chartRef} />
    </Flex>
  )
}

export default GroupedBarChart
