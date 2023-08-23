import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import type { Location, Params } from 'react-router-dom'

export const getRoutePath = (location: Location, params: Params): string => {
  const { pathname } = location

  if (!Object.keys(params).length) {
    return pathname // we don't need to replace anything
  }

  let path = pathname
  Object.entries(params).forEach(([paramName, paramValue]) => {
    if (paramValue) {
      path = path.replace(paramValue, `:${paramName}`)
    }
  })
  return path
}
