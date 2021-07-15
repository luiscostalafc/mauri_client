/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { api } from '../../services/API/index';
import { validateForm, validationErrors } from '../../services/validateForm';
import {
  AnimationContainer,
  Background,
  Content,
  Image,
  // eslint-disable-next-line prettier/prettier
  ImageCart,
} from '../../styles/pages/sign-in';
import { User } from '../../types';

interface SignInFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
  expires_in: number;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const router = useRouter();

  const schema = Yup.object().shape({
    email: Yup.string()
      .required('E-mail obrigatório')
      .email('Digite um e-mail válido'),
    password: Yup.string().required('Senha obrigatória'),
  });

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      const { hasErrors, toForm, toToast } = await validateForm(schema, data);
      if (hasErrors) {
        formRef.current?.setErrors(toForm);
        toToast.map(({ path, message }) =>
          addToast(validationErrors({ path, message })),
        );
        return;
      }

      const { email, password } = data;
      const { data: response, ok, messageErrors } = await api.post('login', {
        email,
        password,
      });

      if (ok) {
        const { token, user, expires_in } = response as LoginResponse;
        // @ts-ignore
        await signIn({ token, user, expires_in });

        if (user.inactive === true) {
          addToast({
            type: 'info',
            title: 'Cadastro em análise',
            description:
              'Seu cadastro está em fase de análise, em breve você receberá um e-mail. Obrigado!',
          });
        } else {
          router.push('/home');
        }
      } else {
        messageErrors?.length &&
          messageErrors.map(({ path, message }) =>
            addToast(validationErrors({ path, message })),
          );
      }
    },
    [schema, addToast, signIn, router],
  );

  return (
    <Container>
      <Row>
        <Col xs={12} md={3} lg={3}>
          <ImageCart src="/liconnection.svg" alt="Logo do site" />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={3} lg={3}>
          <AnimationContainer>
            <Content>
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
            </Content>
          </AnimationContainer>
        </Col>
        <Col xs={12} md={{ span: 6, offset: 3 }} lg={{ span: 6, offset: 3 }}>
          <Background>
            <Image src="../home.png" />
          </Background>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
