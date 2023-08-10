import React, { useContext } from 'react'
import { get } from 'lodash'

import { Box, Button, createStyles, Flex, px, Text } from '@mantine/core'
import { googleLogout } from '@react-oauth/google'
import {
  CredentialResponse,
  // GoogleLogin,
  useGoogleLogin,
} from '@react-oauth/google'

import { LogoutIcon } from '../Svg'
import axios from 'axios'
import { AppContext } from '~/pages/context/Popup/AppContext/AppProvider'
import GoogleLogin from 'react-google-login'

const useStyles = createStyles((theme) => ({
  textLogout: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[8] : '#EAEAEA',
    fontSize: theme.fontSizes.sm,
    fontWeight: 400,
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
  const onLogin = async (credentialResponse: CredentialResponse) => {
    const res = await axios.post(`https://api-dev.chatcrypto.chat`, {
      token: credentialResponse.credential,
    })
    const access_token = get(res, 'data.access_token', '')

    if (access_token) {
      setAccessToken(access_token)
    }
  }

  const onLogout = () => {
    googleLogout()
    setAccessToken('')
  }

  const responseGoogle = (response: any) => {
    console.log(response)
  }

  const onHandleLogin = () => {
    // chrome.
  }

  // const login = useGoogleLogin({
  //   onSuccess: (tokenResponse) => console.log(tokenResponse, 'tokenResponse'),
  // })
  // if (mounted) {
  // return (
  //   <>
  //     {accessToken ? (
  //       <Flex
  //         align="center"
  //         justify="flex-start"
  //         gap={px('0.75rem')}
  //         onClick={onLogout}
  //       >
  //         <LogoutIcon />
  //         <Text className={classes.textLogout}>Logout</Text>
  //       </Flex>
  //     ) : (
  //       <Box>
  //         <GoogleLogin
  //           onSuccess={(credentialResponse) => {
  //             onLogin(credentialResponse)
  //           }}
  //           // theme="filled_blue"
  //           // type="icon"
  //           shape="circle"
  //           onError={() => {
  //             console.log('Login Failed')
  //           }}
  //           size="large"
  //           width="100px"
  //         />
  //         hihihih
  //       </Box>
  //     )}
  //   </>
  // )
  // }

  // return (
  //   <GoogleLogin
  //     clientId="681907933403-hl0r8onfuhteg24otjh77tihrv61vbcd.apps.googleusercontent.com"
  //     buttonText="Login"
  //     onSuccess={responseGoogle}
  //     onFailure={responseGoogle}
  //     cookiePolicy={'single_host_origin'}
  //   />
  // )
  return (
    <>
      {/* <button id="login">Login</button>
      <Button variant="outline">Logout</Button> */}
    </>
  )
}

export default GoogleLoginButton
