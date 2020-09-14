import React, { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FiArrowLeft, FiMail, FiUser, FiLock, FiTrello} from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { Checkbox } from "@chakra-ui/core";


import api from '../services/api'

import { useToast } from '../hooks/toast'

import getValidationErrors from '../utils/getValidationErrors'

import Button from '../components/Button'
import Input from '../components/Input'
import InputMask from '../components/InputMask'

import {
  Container,
  Content,
  AnimationContainer
} from '../styles/pages/sign-up'

interface SignUpFormData {
  name: string
  username: string
  activity: string
  email: string
  rg: string
  cpf_cnpj: string
  password: string
}

  const SignUp: React.FC = () => {
  const [cpfNumber, setCpfNumber] = useState(true)
  const [check, setChecked] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const router = useRouter()

  const handleOptionDocument = useCallback(() => {
    if (cpfNumber === true) {
      setCpfNumber(false)
      setChecked(true)
    }else {
      setCpfNumber(true)
      setChecked(false)
    }


  }, [cpfNumber, check])



  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome completo'),
          username: Yup.string().required('Nome de usuário obrigatório'),
          activity: Yup.string().required('Preencha sua ocupação profissional'),
          rg: Yup.string().required('Preencha seu RG'),
          cpf_cnpj: Yup.string().required('Preencha o CNPJ ou RG'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos')
        })
        await schema.validate(data, {
          abortEarly: false
        })
        await api.post('users', data)

        router.push('phone-sign-up')

        addToast({
          type: 'success',
          title: 'Dados de usuário preenchidos com sucesso!',
          description: 'Você agora preencherá os dados telefônicos'
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'info',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer seu cadastro. Verifique seus dados e tente novamente.'
        })
      }
    },
    [addToast, router]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>


          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Dados do usuário</h1>

            <Input name="name" icon={FiUser} placeholder="Nome completo" />
            <Input name="username" icon={FiUser} placeholder="Usuário" />
            <Input name="activity" icon={FiUser} placeholder="Ocupação Profissional" />
            <Input name="rg" icon={FiTrello} placeholder="RG" />
            <Checkbox size="sm" onChange={handleOptionDocument} defaultIsChecked={check}>Mudar para CNPJ</Checkbox>
            {
             cpfNumber ? (
               <InputMask mask="999.999.999-99" name="cpf_cnpj" icon={FiTrello} placeholder="CPF" />
             ):(
              <InputMask mask="99.999.999/9999-99" name="cpf_cnpj" icon={FiTrello} placeholder="CNPJ" />
             )

            }

            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">
              Avançar {'>>'}
              </Button>
          </Form>
          <Link href="sign-in">
            <a>
              <FiArrowLeft />
              Voltar ao login
            </a>
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp

