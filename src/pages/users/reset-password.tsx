import React, { useRef, useCallback } from 'react'
import Link from 'next/link'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import querySearch from 'stringquery';


import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'

import { useRouter } from 'next/router'
import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationErrors'

import Button from '../../components/Button'
import Input from '../../components/Input'

import {
  Container,
  Content,
  Background,
  Image,
  ImageCart,
  AnimationContainer
} from '../../styles/pages/sign-in'
import api from '../../services/api'

interface ResetPasswordFormData {
  password: string
  password_confirmation: string;
}


const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast();

  const router = useRouter();


  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha é obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Confirmação incorreta',
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

         const {  password, password_confirmation} = data;

         const query = querySearch(location.search);

         const token = new URLSearchParams(query).get('token');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        router.push('/users/login');

      } catch (err) {
       if (err instanceof Yup.ValidationError) {
         const errors = getValidationErrors(err);

         formRef.current?.setErrors(errors);

         return;
       }

       addToast({
         type: 'error',
         title: 'Erro ao resetar  senha',
         description: 'Ocorreu um erro ao resetar usa senha, tente novamente',
       });
      }
    },
    [addToast, router, location.search],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <ImageCart src="/liconnection.svg" alt="Logo do site" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>

      <Background>
        <Image src="../home.png" />
      </Background>
    </Container>
  )
}

export default ResetPassword


