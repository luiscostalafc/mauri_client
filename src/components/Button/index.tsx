import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'
import { IconBaseProps } from 'react-icons'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  icon?: React.ComponentType<IconBaseProps>

}

const Button: React.FC<ButtonProps> = ({ children, icon, loading, ...rest }) => {
  return (
    <Container
      disabled={loading}
      isLoading={Number(loading)}
      type="button"
      {...rest}
    >
      {loading ? 'Carregando...' : children}
    </Container>
  )
}

export default Button
