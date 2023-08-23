import React from 'react'
import {
  Box,
  Flex,
  Footer,
  Header,
  AppShell as MantineAppShell,
  Popover,
  Stack,
  Text,
  createStyles,
} from '@mantine/core'
import { CancelIcon, HomeIcon, LogoIcon, MenuDotIcon } from '../common/Svg'
import MenuItem from './MenuItem'
import { getRoutePath } from '~/utils/getCurrentPath'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useClickOutside, useDisclosure } from '@mantine/hooks'

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
  const location = useLocation()
  const params = useParams()
  const currentPath = getRoutePath(location, params)
  const [opened, { close, open }] = useDisclosure(false)
  const navigate = useNavigate()
  const outsideRef = useClickOutside(() => close())
  const onHandleNavigate = (pathName: string) => {
    close()
    navigate(pathName)
  }

  const onHandleCloseExtension = () => {
    // @ts-ignore
    if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
      // @ts-ignore
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
          height={75}
          p="16px"
          styles={(theme) => ({
            root: {
              backgroundColor: theme.colors.background[1],
            },
          })}
        >
          <Flex justify="space-between" align="center">
            <Flex align="center">
              <LogoIcon />
              <Text ml="12px" className={classes.titleText}>
                Chatcrypto
              </Text>
            </Flex>
            <Flex align="center" gap="16px">
              <Popover
                width={230}
                position="bottom"
                shadow="md"
                opened={opened}
                trapFocus
              >
                <Popover.Target>
                  <Box onClick={open}>
                    <MenuDotIcon />
                  </Box>
                </Popover.Target>
                <Popover.Dropdown
                  sx={(theme) => ({
                    padding: '16px',
                  })}
                >
                  <Stack spacing="0px" ref={outsideRef}>
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
                  </Stack>
                </Popover.Dropdown>
              </Popover>
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
