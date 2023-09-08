import dayjs from "dayjs"

import { convertToMiliseconds } from "~/utils/dateTime"

import { FieldChartType } from "./types"

export const checkType2ParseData = (type: string, data: any) => {
  if (type === FieldChartType.Date) {
    return dayjs(convertToMiliseconds(data)).format('DD/MM/YY (HH:mm)')
  }
  return data
}