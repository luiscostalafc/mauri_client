import React, { useCallback, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FiArrowLeft, FiMail, FiUser, FiLock, } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import api from '../../../services/api'

import { useToast } from '../../../hooks/toast'

import getValidationErrors from '../../../utils/getValidationErrors'

import logoImg from '../../assets/liconnection.svg'
import signUpBackgroundImg from '../../assets/liconnection_logo.jpeg'

import Button from '../../../components/Button'
import Input from '../../../components/Input'

import {
  Container,
  Content,
  Background,
  Image,
  AnimationContainer
} from './styles'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const router = useRouter()

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Apelido'),
          username: Yup.string().required('Nome de usuário obrigatório'),
          completeName: Yup.string().required('Nome Completo'),
          rg: Yup.string().required('Preencha seu RG'),
          cpfCnpj: Yup.string().required('Preencha o CNPJ OU RG'),
          nick: Yup.string().required('Preencha um apelido'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos')
        })
        await schema.validate(data, {
          abortEarly: false
        })
        await api.post('/users', data)

        router.push('/sign-in')

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no Liconnection'
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
      <Background>
        <Image src={signUpBackgroundImg} />
      </Background>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Liconnection" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link href="sign-in">
            <a>
              <FiArrowLeft />
              Voltar para logon
            </a>
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp
