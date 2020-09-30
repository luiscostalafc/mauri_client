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
  user_id: number
  provider_id: number
  order_status_id: number
  delivery_id: number
}

const schema = Yup.object().shape({
  user_id: Yup.number().required('Usuário é obrigatório'),
  provider_id: Yup.number().required('Prestador obrigatório'),
  order_status_id: Yup.number().required('Status obrigatório'),
  delivery_id: Yup.number().required('Status obrigatório'),
})

const moduleName = 'orders'
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

      const response = await post(moduleName, data)
      if (response) {
        addToast(creationToast.success)
        router.push(`/admin/${moduleName}`)
      }
    },
    [router, addToast]
  )

  return (
    <Template 
    content={
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Pedidos</h1>
        <Input name="user_id" placeholder="user_id" />
        <Input name="provider_id" placeholder="provider_id" />
        <Input name="order_status_id" placeholder="order_status_id" />
        <Input name="delivery_id" placeholder="delivery_id" />

        <Button type="submit">Inserir</Button>
      </Form>     
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}