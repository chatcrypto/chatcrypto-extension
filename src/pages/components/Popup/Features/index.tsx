import React from 'react'
import { Flex, SimpleGrid, Stack, Text, createStyles } from '@mantine/core'
import { QuestionIcon } from '../../common/Svg'

const useStyles = createStyles((theme) => ({
  boxWrapper: {
    borderRadius: '16px',
    border: '1px solid #eaeaea',
    padding: '24px',
    backgroundColor: 'white',
  },
}))

const Features = () => {
  const { classes } = useStyles()

  return (
    <Stack spacing="16px">
      <Flex
        gap={14}
        direction="column"
        align="center"
        className={classes.boxWrapper}
      >
        <QuestionIcon />
        <Text align="center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
          tristique
        </Text>
      </Flex>
      <Flex
        gap={14}
        direction="column"
        align="center"
        className={classes.boxWrapper}
      >
        <QuestionIcon />
        <Text align="center">
          Curabitur ullamcorper ex vitae sagittis commodo. Aliquam at tristique
          magna.
        </Text>
      </Flex>
      <Flex
        gap={14}
        direction="column"
        align="center"
        className={classes.boxWrapper}
      >
        <QuestionIcon />
        <Text align="center">
          Aenean egestas imperdiet est. Maecenas gravida hendrerit accumsan.
        </Text>
      </Flex>
    </Stack>
  )
}

export default Features
