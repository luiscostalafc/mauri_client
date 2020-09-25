import React, { useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import Template from '../../../components/Template'
import AdminMenu from '../../../components/AdminMenu'

import { FormHandles } from '@unform/core'

import { useToast } from '../../../hooks/toast'

import Button from '../../../components/Button'
import Input from '../../../components/Input'

import { validateForm } from '../../../services/validateForm'
import { post } from '../../../services/api'
import { creationToast, validationErrorToast } from '../../../config/toastMessages'

interface FormData {
  operation: string
}

const schema = Yup.object().shape({
  operation: Yup.string().required('Operação é obrigatória'),
})

export default function Create() {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const router = useRouter()


  const handleSubmit = useCallback(
    async (data: FormData) => {
      const validationErrors = await validateForm(schema, data)
      if (validationErrors) {
        formRef.current?.setErrors(validationErrors)
        addToast(validationErrorToast)
        return
      }

      const response = await post('operations', data)
      if (response) {
        addToast(creationToast.success)
        router.push('/')
      }
    },
    [router, addToast]
  )

  return (
    <Template 
    content={
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Operações</h1>
        <Input name="operation" placeholder="Operação" />
        <Button type="submit">Inserir</Button>
      </Form>     
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}