import React from 'react'

import { Button, createStyles, Flex, rem } from '@mantine/core'

import useAuth from '~/hooks/useAuth'

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

const GoogleLoginButton = () => {
  const { classes } = useStyles()
  const { login, isLoading } = useAuth()

  return (
    <Flex align="center" justify="center" direction="column" mb={rem(30)}>
      <Button
        id="login"
        className={classes.loginButton}
        mt="16px"
        loading={isLoading}
        onClick={login}
      >
        <GoogleLoginIcon />
        Sign in with Google
      </Button>
    </Flex>
  )
}

export default GoogleLoginButton
