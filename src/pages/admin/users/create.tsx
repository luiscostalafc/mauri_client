import React, { useRef, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import Template from '../../../components/Template'
import AdminMenu from '../../../components/AdminMenu'

import { FormHandles } from '@unform/core'
import { Checkbox } from '@chakra-ui/core'

import { useToast } from '../../../hooks/toast'

import Button from '../../../components/Button'
import Input from '../../../components/Input'
import InputMask from '../../../components/InputMask'

import { validateForm } from '../../../services/validateForm'
import { post } from '../../../services/api'
import { creationToast, validationErrorToast } from '../../../config/toastMessages'
import InputToogle from '../../../components/InputToogle'

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

export default function Create() {
  const [cpfNumber, setCpfNumber] = useState(true)
  const [check, setChecked] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const router = useRouter()

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    activity: Yup.string().required('Atividade é obrigatória'),
    email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
    rg: Yup.string().required('RG é obrigatório'),
    cpf_cnpj: Yup.string().required('CPF/CNPJ é obrigatório'),
  })

  const handleOptionDocument = useCallback(() => {
    if (cpfNumber === true) {
      setCpfNumber(false)
      setChecked(true)
    } else {
      setCpfNumber(true)
      setChecked(false)
    }


  }, [cpfNumber, check])

  const handleSubmit = useCallback(
    async (data: FormData) => {
      const validationErrors = await validateForm(schema, data)

      if (validationErrors) {
        formRef.current?.setErrors(validationErrors)
        addToast(validationErrorToast)
        return
      }

      data.inactive = Boolean(data.inactive)
      data.is_provider = Boolean(data.is_provider)

      const response = await post('users', data, false, false, true)
      if (response) {
        addToast(creationToast.success)
        router.push('/admin/users')
      }
    },
    [router, addToast]
  )

  return (
    <Template
    content={
      <Form style={{ width: '80vh'}}  ref={formRef} onSubmit={handleSubmit}>
        <h1>Usuários</h1>
        <Input name="name" placeholder="Nome" />
        <Input name="username" placeholder="Username" />
        <Input name="activity" placeholder="Atividade" />
        <Input name="complete_name" placeholder="Nome completo" />
        <Input name="email" placeholder="E-mail" />
        <Input name="rg" placeholder="RG" />
        <Checkbox variantColor="green" borderColor="#ed8936" size="sm" onChange={handleOptionDocument} defaultIsChecked={check}>Mudar para CNPJ</Checkbox>
            {
              cpfNumber ? (
                <InputMask  mask="999.999.999-99" name="cpf_cnpj"  placeholder="CPF" />
              ) : (
                  <InputMask mask="99.999.999/9999-99" name="cpf_cnpj"  placeholder="CNPJ" />
                )

            }
        <Input name="nick" placeholder="Apelido" />
        <InputToogle  name="is_provider" placeholder="Fornecedor"/>
        <InputToogle name="inactive" placeholder="Inativo"/>

        <Button typeColor="create" type="submit">Inserir</Button>
      </Form>
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}
