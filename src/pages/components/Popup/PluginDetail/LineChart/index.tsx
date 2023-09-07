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
import { Line } from 'react-chartjs-2'

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
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const useStyles = createStyles(() => ({
  resetIcon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))

const LineChart = ({ pluginDetail }: { pluginDetail: IPluginDetail }) => {
  const { classes } = useStyles()
  const scaleOpts = {
    grid: {
      // borderColor: Utils.randomColor(1),
      color: 'rgba( 0, 0, 0, 0.1)',
    },
    title: {
      display: true,
      // text: (ctx) => ctx.scale.axis + ' axis',
    },
  }
  const scales: any = {
    x: {
      type: 'category',
      min: 1,
      max: 11,
    },
    y: {
      type: 'linear',
    },
  }
  Object.keys(scales).forEach((scale) =>
    Object.assign(scales[scale], scaleOpts),
  )
  const options = useMemo(() => {
    return {
      responsive: true,
      scales: scales,
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
  }, [pluginDetail.title, scales])

  // const labels = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  // ]

  const chartData: IDateLineChart[] = useMemo(() => {
    return pluginDetail.data as IDateLineChart[]
  }, [pluginDetail])

  const data = useMemo(() => {
    return {
      labels: chartData[0].row_data.map((d) =>
        checkType2ParseData(chartData[0].x_field, d[chartData[0].x_field]),
      ),
      datasets: chartData.map((line, index) => ({
        label: line.label,
        data: line.row_data.map((point) => point[chartData[0].y_field]),
        backgroundColor: COLORS_CHART[index],
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
      <Line options={options as any} data={data} ref={chartRef} />
    </Flex>
  )
}

export default LineChart
