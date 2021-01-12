import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import querySearch from 'querystring';
import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import {
  AnimationContainer, Background, Container,
  Content,
  Image,
  ImageCart
} from '../../styles/pages/sign-in';
import getValidationErrors from '../../utils/getValidationErrors';


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


