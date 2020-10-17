import React, { ButtonHTMLAttributes } from 'react'

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
      {loading ? 'Carregando...' : children}
    </Container>
  )
}

export default Button
