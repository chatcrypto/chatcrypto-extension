// @ts-nocheck

import React, { useContext } from 'react'

import { Box, Button, createStyles, Flex, px, rem, Text } from '@mantine/core'

import { AppContext } from '~/pages/context/Popup/AppContext/AppProvider'
import { GoogleLoginIcon, LogoutIcon } from '../Svg'
import axios from 'axios'
import { get } from 'lodash'

const useStyles = createStyles((theme) => ({
  loginButton: {
    background: 'linear-gradient(135deg, #6F8AFE 0%, #4243BF 100%)',
    width: '100%',
    padding: '12px 24px',
    display: 'flex',
    height: '48px',
    borderRadius: '8px',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '15px',
    fontWeight: 700,
    lineHeight: '24px',
    border: 'none',
    boxShadow: 'none',
  },
}))
const useIsMounted = () => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  return mounted
}

const GoogleLoginButton = () => {
  const { classes } = useStyles()
  const mounted = useIsMounted()
  const { accessToken, setAccessToken } = useContext(AppContext)

  const onHandleLoginViaGoogle = () => {
    if (chrome && chrome.identity) {
      chrome.identity.getAuthToken(
        {
          interactive: true,
        },
        function (auth_token) {
          axios
            .post(`https://api-dev.chatcrypto.chat/auth/gmail/extension`, {
              token: auth_token,
            })
            .then((res) => {
              const access_token = get(res, 'data.data.access_token', '')
              if (access_token) {
                setAccessToken(access_token)
              }
            })
        },
      )
    }
  }

  const onHandleLogout = () => {
    if (chrome && chrome.identity) {
      if (accessToken) {
        chrome.identity.clearAllCachedAuthTokens((response) => {
          setAccessToken('')
        })
      }
    }
  }

  return (
    <Flex align="center" justify="center" direction="column" mb={rem(30)}>
      {accessToken ? (
        <Button
          id="logout"
          className={classes.loginButton}
          mt="16px"
          onClick={onHandleLogout}
        >
          Logout
        </Button>
      ) : (
        <Button
          id="login"
          className={classes.loginButton}
          mt="16px"
          onClick={onHandleLoginViaGoogle}
        >
          <GoogleLoginIcon />
          Sign in with Google
        </Button>
      )}
    </Flex>
  )
}

export default GoogleLoginButton
