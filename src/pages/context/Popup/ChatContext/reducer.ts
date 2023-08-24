/* eslint-disable no-param-reassign */
import { findLast } from 'lodash'

import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IChatState, IMessageDetail } from './types'

export const initialState: IChatState = {
  chatMode: false,
  botChatting: false,
  allowTypeWritterEffect: true,
  messageList: [],
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatMode: (state, action: PayloadAction<boolean>) => {
      state.chatMode = action.payload
    },
    setBotChatting: (state, action: PayloadAction<boolean>) => {
      state.botChatting = action.payload
    },
    setAllowTypeWritterEffect: (state, action: PayloadAction<boolean>) => {
      state.allowTypeWritterEffect = action.payload
    },
    setMessageList: (state, action: PayloadAction<IMessageDetail[]>) => {
      state.messageList = action.payload
    },
    setMessageDoneRendering: (
      state,
      action: PayloadAction<{
        _id: string
      }>,
    ) => {
      const newMessageList = state.messageList.map((m) => {
        if (m.id === action.payload._id) {
          return {
            ...m,
            done: true,
          }
        }

        return m
      })
      setMessageList(newMessageList)
    },
    setLatestMessageDoneRendering: (state) => {
      state.allowTypeWritterEffect = false
      state.botChatting = false

      const lastBotMessage = findLast(state.messageList, (messageDetail) => {
        return messageDetail.type === 'bot' && !messageDetail.done
      })

      const newMessageList = state.messageList.map((m) => {
        if (m.id === lastBotMessage?.id) {
          return {
            ...lastBotMessage,
            done: true,
          }
        }

        return m
      })

      setMessageList(newMessageList)
    },
  },
})

export const { reducer } = chatSlice
export const {
  setChatMode,
  setMessageList,
  setMessageDoneRendering,
  setLatestMessageDoneRendering,
  setBotChatting,
  setAllowTypeWritterEffect,
} = chatSlice.actions
