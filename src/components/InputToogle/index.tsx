import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { useField } from '@unform/core'
import { FormLabel, Switch } from "@chakra-ui/core"

import { Container, Error } from './styles'

interface InputToogleProps {
  name: string;
  placeholder?: string;
  icon?: React.ComponentType<IconBaseProps>;
  size?:	'sm' | 'md' | 'lg'
  color?:	string
  value?:	string
  children?: React.Component
  'aria-label'?:	string
  'aria-labelledby'?:	string
  isChecked?:	boolean
  defaultIsChecked?:	boolean
  isDisabled?:	boolean
  isInvalid?:	boolean
}

const InputToogle: React.FC<InputToogleProps> = ({ name, icon: Icon, placeholder, size, color, ...rest }) => {
   const inputRef = useRef<HTMLInputElement>(null)

   const [isFocused, setIsFocused] = useState(false);
   const [isFilled, setIsFilled] = useState(false);

   const { fieldName, defaultValue, error, registerField } = useField(name);

   const handleInputBlur = useCallback(() => {
     setIsFocused(false)

     setIsFilled(!!inputRef.current?.value)
   }, [])

   const handleInputFocus = useCallback(() => {
     setIsFocused(true)

   }, [])

   useEffect(() => {
     registerField({
       name: fieldName,
       ref: inputRef.current,
       path: 'value'
     })
   }, [fieldName, registerField])


  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      {placeholder && <FormLabel htmlFor="email-alerts">{placeholder}</FormLabel>}
      <Switch 
        size={size || 'md'}
        color={color || 'teal'}
        value={defaultValue}
        ref={inputRef} {...rest}
      />
      {error &&
      <Error title={error}>
        <FiAlertCircle color="#c53030" size={20}/>
        </Error> }
    </Container>
  )

}

export default InputToogle
