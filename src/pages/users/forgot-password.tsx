/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Link from 'next/link';
import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
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

interface ForgotFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'info',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <ImageCart src="/liconnection.svg" alt="Logo do site" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>

          <Link href="sign-in">
            <a>
              <FiLogIn />
              Voltar ao login
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

export default ForgotPassword;
