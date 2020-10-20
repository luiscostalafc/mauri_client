import React, { useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import Template from '../../../components/Template'
import AdminMenu from '../../../components/AdminMenu'

import { FormHandles } from '@unform/core'
import { Heading } from '@chakra-ui/core'

import { useToast } from '../../../hooks/toast'

import Button from '../../../components/Button'
import Input from '../../../components/Input'
import InputToogle from '../../../components/InputToogle'

import { validateForm } from '../../../services/validateForm'
import { put, get } from '../../../services/api'
import { updateToast, validationErrorToast } from '../../../config/toastMessages'

interface FormData {
  name: string
  username: string
  activity: string
  complete_name: string
  email: string
  rg: string
  cpf_cnpj: string
  nick: string
  is_provider: boolean
  inactive: boolean
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  activity: Yup.string().required('Atividade é obrigatória'),
  email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
  rg: Yup.string().required('RG é obrigatório'),
  cpf_cnpj: Yup.string().required('CPF/CNPJ é obrigatório'),
})

const moduleName = 'users'
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
      data.is_provider = Boolean(data.is_provider)

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
        <Heading>Usuários</Heading>
        <Input name="name" placeholder="Nome" />
        <Input name="username" placeholder="Username" />
        <Input name="activity" placeholder="Atividade" />
        <Input name="complete_name" placeholder="Nome completo" />
        <Input name="email" placeholder="E-mail" />
        <Input name="rg" placeholder="RG" />
        <Input name="cpf_cnpj" placeholder="CPF ou CNPJ" />
        <Input name="nick" placeholder="Apelido" />
        <InputToogle name="is_provider" placeholder="Fornecedor"/>
        <InputToogle name="inactive" placeholder="Inativo"/>

        <Button typeColor="create" type="submit">Editar</Button>
      </Form>
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}
