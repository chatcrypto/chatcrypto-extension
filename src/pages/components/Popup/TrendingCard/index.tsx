import React from 'react'

import { Box, createStyles, Paper, Stack, Text } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  wrapper: {
    borderRadius: '8px',
    border: `1px solid ${theme.colors.primary[0]}`,
    backgroundColor: '#fff',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  badge: {
    borderRadius: '4px',
    backgroundColor: theme.colors.primary[0],
    padding: '4px',
    fontSize: '8px',
    fontWeight: 700,
    lineHeight: '12px',
    display: 'inline',
    textTransform: 'uppercase',
    color: 'white',
    width: '85px',
  },
  mainText: {},
}))

const TrendingCard = ({
  title,
  content,
  onClick,
}: {
  title: string
  content: string
  onClick: () => void
}) => {
  const { classes } = useStyles()

  return (
    <Paper className={classes.wrapper} onClick={onClick}>
      <Box className={classes.badge}>{title}</Box>
      <Stack spacing="8px">
        <Text>{content}</Text>
      </Stack>
    </Paper>
  )
}

export default TrendingCard
