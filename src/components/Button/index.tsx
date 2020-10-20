import React, { ButtonHTMLAttributes } from 'react'

import {Spinner} from '@chakra-ui/core'

import { Container } from './styles'
import { IconBaseProps } from 'react-icons'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  icon?: React.ComponentType<IconBaseProps>
  typeColor?: boolean | any

}

const Button: React.FC<ButtonProps> = ({ children, typeColor, icon, loading, ...rest }) => {
  return (
    <Container
      disabled={loading}
      isLoading={Number(loading)}
      type="button"
      typeColor={typeColor}
      {...rest}
    >
      {loading ?
      <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
      /> : children}
    </Container>
  )
}

export default Button
