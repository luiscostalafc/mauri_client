import React, { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FiArrowLeft, FiMail, FiUser, FiLock, FiTrello } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'




import api from '../services/api'

import { useToast } from '../hooks/toast'

import getValidationErrors from '../utils/getValidationErrors'

import Button from '../components/Button'
import Input from '../components/Input'
import InputMask from '../components/InputMask'
import SelectInput from '../components/SelectInput'

import {
  Container,
  Content,
  AnimationContainer
} from '../styles/pages/sign-up'

interface PhoneFormData {
  type: string
  area_code: string
  phone: string
  whatsapp: boolean
  obs?: string
}

const SignUp: React.FC = () => {
const [searchOption, setSearchOption] = useState('residencial');
const [optionSelected, setOptionSelected] = useState<string>('');


  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const router = useRouter()

  const optionsSelect = [
    {value: 'residencial', label: 'residencial' },
    {value: 'comercial', label: 'comercial' },
  ];

  const toggleOption = useCallback(() => {
    setSearchOption(state => (state === 'residencial' ? 'comercial' : 'residencial'));
    setOptionSelected('');
    formRef.current?.clearField('residencial');
  }, []);




  const handleSubmit = useCallback(
    async (data: PhoneFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          type: Yup.string().required('Tipo do telefone deve ser selecionado'),
          area_code: Yup.string().required('Digite o código de área'),
          phone: Yup.string().required('Preencha o número do seu telefone'),
          whatsapp: Yup.boolean().required('Esse número possui Whatsapp?'),
          obs: Yup.string().optional(),
        })
        await schema.validate(data, {
          abortEarly: false
        })
        await api.post('phones', data)

        router.push('address-sing-up')

        addToast({
          type: 'success',
          title: 'Cadastro dos dados telefônicos realizado com sucesso!',
          description: 'Agora falta pouco... Preencha seu dados de endereço'
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
            <h1>Contatos</h1>


           <SelectInput
            name="type"
            defaultValue={{ value: 'residencial', label: 'residencial'}}
            onChange={toggleOption}
            options={optionsSelect}
           />

            <Input name="name" icon={FiUser} placeholder="Nome completo" />
            <Input name="username" icon={FiUser} placeholder="Usuário" />
            <Input name="activity" icon={FiUser} placeholder="Ocupação Profissional" />
            <Input name="rg" icon={FiTrello} placeholder="RG" />
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
          <Link href="sign-up">
            <a>
              <FiArrowLeft />
              Voltar aos Dados do usuário
            </a>
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp

