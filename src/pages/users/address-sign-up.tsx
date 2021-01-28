/* eslint-disable jsx-a11y/anchor-is-valid */
import { Progress } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import { FaCity } from 'react-icons/fa';
import { FiArrowLeft, FiMapPin } from 'react-icons/fi';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';
import { useToast } from '../../hooks/toast';
import { post } from '../../services/api';
import {
  AnimationContainer,
  Background,
  Container,
  Content,
  // eslint-disable-next-line prettier/prettier
  ImageCart
} from '../../styles/pages/address-sign-up';
import getValidationErrors from '../../utils/getValidationErrors';

interface AddressFormData {
  user_id: string;
  cep: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
  complement: string;
}

const AddressSignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (data: AddressFormData) => {
      try {
        const userId = Cookies.get('@Liconnection:user');

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          user_id: Yup.string(),
          cep: Yup.string().required('Preencha o CEP'),
          state: Yup.string().required('Preencha o UF'),
          city: Yup.string().required('Preencha a cidade'),
          district: Yup.string().required('Preencha o bairro'),
          street: Yup.string().required('Preencha o estado'),
          number: Yup.string().required('Preencha o número ou deixe como s/n'),
          complement: Yup.string(),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const userData = { ...data, user_id: userId };

        await post('addresses', userData);

        router.push('sign-in');

        addToast({
          type: 'success',
          title: 'Cadastro dos dados telefônicos realizado com sucesso!',
          description: 'Agora falta pouco... Preencha seu dados de endereço',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'info',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer seu cadastro. Verifique seus dados e tente novamente.',
        });
      }
    },
    [addToast, router],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Endereço</h1>

            <Progress
              margin={5}
              hasStripe
              isAnimated
              value={100}
              size="sm"
              color="green"
            />

            <InputMask
              mask="99999-999"
              name="cep"
              icon={FiMapPin}
              placeholder="CEP"
            />

            <Input name="street" icon={FiMapPin} placeholder="Rua" />

            <Input name="number" icon={FiMapPin} placeholder="Número" />

            <Input
              name="complement"
              icon={FiMapPin}
              placeholder="Complemento"
            />

            <Input name="district" icon={FiMapPin} placeholder="Bairro" />

            <Input name="city" icon={FaCity} placeholder="Cidade" />

            <Input name="state" icon={FaCity} placeholder="Estado" />

            <Button type="submit">Concluir</Button>
          </Form>
          <Link href="address-sign-up">
            <a>
              <FiArrowLeft />
              Voltar aos Dados de contato
            </a>
          </Link>
        </AnimationContainer>
      </Content>

      <Background>
        <ImageCart src="../cart_no_background.png" />
      </Background>
    </Container>
  );
};

export default AddressSignUp;
