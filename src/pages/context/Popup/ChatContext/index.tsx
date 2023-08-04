import React, { createContext, useReducer } from 'react'
import { IChatState } from './types'
import { reducer } from './reducer'

interface IChatContext {
  state: IChatState
  dispatch: React.Dispatch<any>
}

const initialValue: IChatState = {}

const initialContextValue: IChatContext = {
  state: initialValue,
  dispatch: () => {},
}

export const ChatContext = createContext(initialContextValue)

export const ChatContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialValue)

  return (
    <ChatContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}