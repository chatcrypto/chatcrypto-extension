import React, { createContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

type AppContextType = {
  accessToken: string
  setAccessToken: any
  googleAccount: AccountType | null
  hashEmail: string
}

type AccountType = {
  email: string
  name: string
  exp: number
  iat: number
  token: string
}
export const AppContext = createContext<AppContextType>(null as any)

const AppContextProvider: React.FC<
  React.PropsWithChildren<{ children: React.ReactNode }>
> = ({ children }) => {
  const [accessToken, setAccessToken] = useState('')
  const [hashEmail, setHashEmail] = useState('')
  const [googleAccount, setGoogleAccount] = useState<AccountType | null>(null)

  // useEffect(() => {
  //   const accessTokenCookie = getCookie('access_token') as string
  //   setAccessToken(accessTokenCookie)
  // }, [])

  useEffect(() => {
    if (accessToken) {
      setGoogleAccount(jwt_decode(accessToken))
    } else {
      setGoogleAccount(null)
    }
  }, [accessToken])

  const hashEmailFunc = async () => {
    if (!googleAccount?.email) {
      setHashEmail('')
    } else {
      const utf8 = new TextEncoder().encode(googleAccount?.email)
      const hashBuffer = await crypto.subtle.digest('SHA-256', utf8)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, '0'))
        .join('')
      setHashEmail(hashHex)
    }
  }

  useEffect(() => {
    hashEmailFunc()
    const interval = setInterval(() => {
      // seconds
      const currentTime = new Date().getTime() / 1000

      if (googleAccount && currentTime - googleAccount.exp >= 0) {
        // logout
        if (chrome && chrome.identity) {
          if (accessToken) {
            chrome.identity.clearAllCachedAuthTokens(() => {
              setAccessToken('')
            })
          }
        }
      }
    }, 600000)
    return () => clearInterval(interval)
  }, [googleAccount])

  return (
    <AppContext.Provider
      value={{
        accessToken,
        setAccessToken,
        googleAccount,
        hashEmail,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
