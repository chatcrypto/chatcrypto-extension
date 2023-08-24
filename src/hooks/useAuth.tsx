import React, { useContext, useState } from 'react'
import axios from 'axios'
import { get } from 'lodash'

import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'

import { AppContext } from '~/pages/context/Popup/AppContext/AppProvider'
import { ChatContext } from '~/pages/context/Popup/ChatContext'
import { setChatMode } from '~/pages/context/Popup/ChatContext/reducer'

const useAuth = () => {
  const { accessToken, setAccessToken } = useContext(AppContext)
  const { dispatch: dispatchChatContext } = useContext(ChatContext)
  const [isLoadingSignIn, setIsLoadingSigIn] = useState(false)

  const onHandleLoginViaGoogle = async () => {
    try {
      setIsLoadingSigIn(true)
      if (chrome && chrome.identity) {
        chrome.identity.getAuthToken(
          {
            interactive: true,
          },
          async (auth_token) => {
            const res = await axios.post(
              `https://api-dev.chatcrypto.chat/auth/gmail/extension`,
              {
                token: auth_token,
              },
            )

            const access_token = get(res, 'data.data.access_token', '')
            if (access_token) {
              setAccessToken(access_token)
            }
          },
        )
      }
      setIsLoadingSigIn(false)
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Fail to login',
        color: 'red',
        icon: <IconX />,
      })
      setIsLoadingSigIn(false)
    }
  }

  const onHandleLogout = async () => {
    try {
      if (chrome && chrome.identity) {
        if (accessToken) {
          await chrome.identity.clearAllCachedAuthTokens()
          setAccessToken('')
        }
      }
      dispatchChatContext(setChatMode(false))
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Fail to logout',
        color: 'red',
        icon: <IconX />,
      })
    }
  }

  return {
    login: onHandleLoginViaGoogle,
    logout: onHandleLogout,
    isLoading: isLoadingSignIn,
  }
}

export default useAuth
