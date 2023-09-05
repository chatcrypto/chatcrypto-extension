export interface IPluginListDetail {
  description: string
  func: string
  name: string
  plugin_id: string
  tags: string[]
}

export interface IPluginDetail {
  chart_type: string
  data: Record<any, any>
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
