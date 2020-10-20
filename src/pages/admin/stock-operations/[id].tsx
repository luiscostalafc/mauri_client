import React, { useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Yup from 'yup'

import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'

import { Heading } from '@chakra-ui/core'

import { useToast } from '../../../hooks/toast'

import Template from '../../../components/Template'
import Button from '../../../components/Button'
import Input from '../../../components/Input'

import { validateForm } from '../../../services/validateForm'
import { put, get } from '../../../services/api'
import { updateToast, validationErrorToast } from '../../../config/toastMessages'

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

const moduleName = 'stock-operations'
export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const formRef = useRef<FormHandles>(null)

  useEffect(() => {
    if (id) {
      get(`${moduleName}/${id}`)
      .then(response => formRef.current?.setData({ ...response }))
    }
  }, [id]);

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: FormData) => {

      const validationErrors = await validateForm(schema, data)
      if (validationErrors) {
        formRef.current?.setErrors(validationErrors)
        addToast(validationErrorToast)
        return
      }

      const response = await put(`${moduleName}/${id}`, data)
      if (response) {
        addToast(updateToast.success)
        router.push(`/admin/${moduleName}`)
      }
    },
    [router, addToast, id]
  )

  return (
    <Template
    content={
      <Form style={{ width: '80vh'}} ref={formRef} onSubmit={handleSubmit}>
        <Heading size="md">Operações de Estoque</Heading>
        <Input name="quantity" placeholder="quantidade" />
        <Input name="unit_value" placeholder="unidade de medida" />
        <Input name="comment" placeholder="comentário" />
        <Input name="operation_id" placeholder="operation_id" />
        <Input name="product_id" placeholder="product_id" />

        <Button typeColor="create" type="submit">Editar</Button>
      </Form>
    }
    />
  )
}
