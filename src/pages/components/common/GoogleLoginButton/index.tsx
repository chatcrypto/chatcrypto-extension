// @ts-nocheck

import React, { useContext } from 'react'

import { Box, Button, createStyles, Flex, px, Text } from '@mantine/core'

import { AppContext } from '~/pages/context/Popup/AppContext/AppProvider'
import { GoogleLoginIcon } from '../Svg'

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
    if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({ message: 'googleLogin' })
    }
  }

  return (
    <Button
      id="login"
      className={classes.loginButton}
      mt="16px"
      onClick={onHandleLoginViaGoogle}
    >
      <GoogleLoginIcon />
      Sign in with Google
    </Button>
  )
}

export default GoogleLoginButton
