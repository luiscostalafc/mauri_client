import React, { useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import Template from '../../../components/Template'
import AdminMenu from '../../../components/AdminMenu'

import { Heading } from '@chakra-ui/core'

import { FormHandles } from '@unform/core'

import { useToast } from '../../../hooks/toast'

import Button from '../../../components/Button'
import Input from '../../../components/Input'

import { validateForm } from '../../../services/validateForm'
import { put, get } from '../../../services/api'
import InputToogle from '../../../components/InputToogle'
import { updateToast, validationErrorToast } from '../../../config/toastMessages'

interface FormData {
  delivery: string
  inactive: boolean
}

const schema = Yup.object().shape({
  delivery: Yup.string().required('Entrega é obrigatória'),
})

const moduleName = 'deliveries'
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

      data.inactive = Boolean(data.inactive)
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
    [router, addToast]
  )

  return (
    <Template
    content={
      <Form style={{ width: '80vh'}} ref={formRef} onSubmit={handleSubmit}>
        <Heading>Entregas</Heading>
        <Input name="delivery" placeholder="Entrega" />
        <InputToogle name="inactive" placeholder="Inativo"/>
        <Button typeColor='create' type="submit">Editar</Button>
      </Form>
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}
