import dayjs from "dayjs"

import { FieldChartType } from "./types"

export const checkType2ParseData = (type: string, data: any) => {
  if (type === FieldChartType.Date) {
    return dayjs(data).format('DD/MM')
  }
  return data
}