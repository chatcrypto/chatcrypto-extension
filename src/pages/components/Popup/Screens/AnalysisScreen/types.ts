export interface IPluginListDetail {
  description: string
  func: string
  name: string
  plugin_id: string
  tags: string[]
}

export interface IDateLineChart {
  label: string
  row_data: {
    [key: string]: any
  }[]
  x_field: string
  y_field: string
}

export interface IDatePieChart {
  label: string[]
  row_data: number[]
}
export interface IPluginDetail {
  chart_type: string
  data: IDateLineChart[] | IDatePieChart[] | string
  debug_plugin_metadata: Record<any, any>
  debug_plugin_name: Record<any, any>
  description: string
  plugin_id: string
  success: boolean
  tags: string[]
  title: string
}

export interface IPluginResponse<T> {
  data: T[]
  message: string
}
export interface IPluginDetailResponse<T> {
  data: T
  message: string
}

export enum PluginType {
  LineChart = 'line',
  PieChart = 'pie',
}
