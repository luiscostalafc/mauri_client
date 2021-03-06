/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import {
  AnimationContainer,
  Background,
  Container,
  Content,
  Image,
  // eslint-disable-next-line prettier/prettier
  ImageCart
} from '../../styles/pages/sign-in';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn, user } = useAuth();
  const { addToast } = useToast();

  const router = useRouter();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        // if (user.inactive === true) {
        //   addToast({
        //     type: 'info',
        //     title: 'Cadastro em análise',
        //     description: 'Seu cadastro está em fase de análise, em breve você receberá um e-mail. Obrigado!'
        //   })
        // } else {
        router.push('/home');
        // }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'info',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, verifique seus dados',
        });
      }
    },
    [signIn, router, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <ImageCart src="/liconnection.svg" alt="Logo do site" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <Link href="forgot-password">
              <a>Esqueci minha senha</a>
            </Link>
          </Form>

          <Link href="sign-up">
            <a>
              <FiLogIn />
              Criar conta
            </a>
          </Link>
        </AnimationContainer>
      </Content>

      <Background>
        <Image src="../home.png" />
      </Background>
    </Container>
  );
};

export default SignIn;
