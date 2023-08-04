/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { IChatState } from './types'

export const initialState: IChatState = {}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
})

export const { reducer } = chatSlice
export const {} = chatSlice.actions
