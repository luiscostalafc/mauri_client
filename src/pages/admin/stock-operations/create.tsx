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
  quantity: number
  unit_value: number
  comment: string
  operation_id: number
  product_id: number
}

const schema = Yup.object().shape({
  quantity: Yup.number().required('Quantidade é obrigatório'),
  unit_value: Yup.number().required('Valor unitário é obrigatório'),
  operation_id: Yup.number().required('Operação é obrigatório'),
  product_id: Yup.number().required('Produto é obrigatório'),
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

      const response = await post('stock-operations', data)
      if (response) {
        addToast(creationToast.success)
        router.push('/admin/stock-operations/')
      }
    },
    [router, addToast]
  )

  return (
    <Template 
    content={
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Operações de estoque</h1>
        <Input name="quantity" placeholder="quantity" />
        <Input name="unit_value" placeholder="unit_value" />
        <Input name="comment" placeholder="comment" />
        <Input name="operation_id" placeholder="operation_id" />
        <Input name="product_id" placeholder="product_id" />

        <Button type="submit">Inserir</Button>
      </Form>     
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}