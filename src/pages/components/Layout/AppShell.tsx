import React from 'react'
import {
  Flex,
  Footer,
  Header,
  AppShell as MantineAppShell,
  Text,
  createStyles,
} from '@mantine/core'
import { LogoIcon } from '../common/Svg'

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
          height={100}
          pt="16px"
          pb="24px"
          px="16px"
          styles={(theme) => ({
            root: {
              backgroundColor: theme.colors.background[1],
            },
          })}
        >
          <Flex>
            <Flex align="center">
              <LogoIcon />
              <Text ml="12px" className={classes.titleText}>
                Chatcrypto
              </Text>
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
