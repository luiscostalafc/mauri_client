import { Heading } from '@chakra-ui/core'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef } from 'react'
import * as Yup from 'yup'
import AdminMenu from '../../../components/AdminMenu'
import Bread from '../../../components/Breadcrumb'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import InputToogle from '../../../components/InputToogle'
import Template from '../../../components/Template'
import { updateToast, validationErrorToast } from '../../../config/toastMessages'
import { useToast } from '../../../hooks/toast'
import { get, put } from '../../../services/api'
import { validateForm } from '../../../services/validateForm'






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
  const breads = [
    { href: 'deliveries', label: 'Entregas lista' },
    { href: '#', label: 'Entregas editar' },
  ]
  return (
    <Template
    content={
      <Form style={{ width: '80vh'}} ref={formRef} onSubmit={handleSubmit}>
        <Bread admin breads={breads}/>
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
