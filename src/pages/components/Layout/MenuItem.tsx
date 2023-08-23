import { Flex, Text, px } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import React, { useMemo } from 'react'

import { createStyles } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles(
  (
    theme,
    { isActive, hovered }: { isActive?: boolean; hovered?: boolean },
  ) => ({
    textMenu: {
      fontSize: '15px',
      lineHeight: '24px',
      fontWeight: isActive ? 700 : 400,
    },
    textLogo: {
      fontSize: theme.fontSizes.md,
      fontWeight: 700,
    },
    menuItem: {
      borderRadius: '12px',
      padding: '12px 16px',
      cursor: 'pointer',
      backgroundColor: `${isActive ? '#E9EDFF' : 'transparent'}`,
      transition: 'all 0.2s ease-out',
    },
  }),
)

const MenuItem = ({
  icon,
  title,
  isActive,
  onHandleNavigate,
}: {
  icon: React.ReactNode
  title: string
  isActive: boolean
  onHandleNavigate: () => void
}) => {
  const { hovered, ref } = useHover()
  const { classes, theme } = useStyles({ isActive, hovered })
  const colorIcon = useMemo(() => {
    return isActive ? theme.colors.primary[0] : '#8B8B8B'
  }, [hovered, isActive, theme.colorScheme])
  return (
    <Flex
      gap={px('0.75rem')}
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
      p="sm"
      className={classes.menuItem}
      ref={ref}
      onClick={onHandleNavigate}
    >
      {icon && React.cloneElement(icon as any, { color: colorIcon })}
      <Text className={classes.textMenu}>{title}</Text>
    </Flex>
  )
}

export default MenuItem
