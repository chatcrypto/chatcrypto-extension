import React, { useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import {
  AppShell as MantineAppShell,
  Box,
  createStyles,
  Flex,
  Header,
  Popover,
  Stack,
  Text,
} from '@mantine/core'
import { useClickOutside, useDisclosure } from '@mantine/hooks'

import useAuth from '~/hooks/useAuth'
import { AppContext } from '~/pages/context/Popup/AppContext/AppProvider'
import { getRoutePath } from '~/utils/getCurrentPath'

import { CancelIcon, LogoIcon, LogoutIcon, MenuDotIcon } from '../common/Svg'

import MenuItem from './MenuItem'

const MenuItems = [
  {
    title: 'Analysis',
    icon: null,
    routeName: '/',
  },
  {
    title: 'Chatbot',
    icon: null,
    routeName: '/chat',
  },
]

const useStyles = createStyles((theme) => ({
  titleText: {
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '24px',
    color: '#fff',
  },
}))

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const { classes } = useStyles()
  const { accessToken } = useContext(AppContext)
  const location = useLocation()
  const params = useParams()
  const currentPath = getRoutePath(location, params)
  const [opened, { close, open }] = useDisclosure(false)
  const navigate = useNavigate()
  const { logout } = useAuth()
  const outsideRef = useClickOutside(() => close())
  const onHandleNavigate = (pathName: string) => {
    close()
    navigate(pathName)
  }

  const onHandleCloseExtension = () => {
    if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({ message: 'closePopup' })
    }
  }

  return (
    <MantineAppShell
      styles={(theme) => ({
        root: {
          height: '600px',
          width: '100%',
        },
        main: {
          paddingLeft: '16px',
          paddingRight: '16px',
        },
      })}
      header={
        <Header
          height={accessToken ? 100 : 75}
          p="16px"
          styles={(theme) => ({
            root: {
              backgroundColor: theme.colors.background[1],
            },
          })}
        >
          <Flex justify="space-between" align="center">
            <Box>
              <Flex align="center">
                <LogoIcon />
                <Text ml="12px" className={classes.titleText}>
                  Chatcrypto
                </Text>
              </Flex>
              {accessToken && (
                <Flex
                  gap="12px"
                  mt="8px"
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  }}
                  onClick={logout}
                >
                  <LogoutIcon />
                  <Text
                    sx={{
                      color: '#EAEAEA',
                      fontSize: '12px',
                    }}
                  >
                    Log out
                  </Text>
                </Flex>
              )}
            </Box>

            <Flex align="center" gap="16px">
              {MenuItems.map((item) => (
                <MenuItem
                  title={item.title}
                  icon={item.icon}
                  key={item.title}
                  onHandleNavigate={() => {
                    onHandleNavigate(item.routeName)
                  }}
                  isActive={currentPath === item.routeName}
                />
              ))}
              <CancelIcon onClick={onHandleCloseExtension} />
            </Flex>
          </Flex>
        </Header>
      }
    >
      {children}
    </MantineAppShell>
  )
}

export default AppShell
