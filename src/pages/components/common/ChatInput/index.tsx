import React, { InputHTMLAttributes } from 'react'
import { Input, InputProps } from '@mantine/core'

export type MantineInputPropsTypes = InputProps &
  InputHTMLAttributes<HTMLInputElement>

export interface IChatInput extends MantineInputPropsTypes {}

const ChatInput = ({ ...props }: IChatInput) => {
  return (
    <Input
      size="md"
      w="100%"
      styles={(theme) => ({
        input: {
          borderRadius: '12px',
          padding: '16px',
          height: '56px',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '24px',
          border: '1px solid #EAEAEA',
          paddingRight: '55px',
        },
        rightSection: {
          paddingRight: theme.spacing.md,
          '&:hover': {
            cursor: 'pointer',
          },
        },
      })}
      {...props}
    />
  )
}

export default ChatInput
