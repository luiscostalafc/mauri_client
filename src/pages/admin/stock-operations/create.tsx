/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Heading } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import Bread from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Template from '../../../components/Template';
import {
  creationToast,
  // eslint-disable-next-line prettier/prettier
  validationErrorToast
} from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
import { post } from '../../../services/api';
import { validateForm } from '../../../services/validateForm';

interface FormData {
  quantity: number;
  unit_value: number;
  comment: string;
  operation_id: number;
  product_id: number;
}

const schema = Yup.object().shape({
  quantity: Yup.number().required('Quantidade é obrigatório'),
  unit_value: Yup.number().required('Valor unitário é obrigatório'),
  operation_id: Yup.number().required('Operação é obrigatório'),
  product_id: Yup.number().required('Produto é obrigatório'),
});

export default function Create() {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const router = useRouter();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      const validationErrors = await validateForm(schema, data);
      if (validationErrors) {
        formRef.current?.setErrors(validationErrors);
        addToast(validationErrorToast);
        return;
      }

      const response = await post('stock-operations', data);
      if (response) {
        addToast(creationToast.success);
        router.push('/admin/stock-operations/');
      }
    },
    [router, addToast],
  );
  const breads = [
    { href: 'stock-operations', label: 'Operações de Estoque lista' },
    { href: '#', label: 'Operações de Estoque criar' },
  ];
  return (
    <Template
      content={
        <Form style={{ width: '80vh' }} ref={formRef} onSubmit={handleSubmit}>
          <Bread admin breads={breads} />
          <Heading size="md">Operações de estoque</Heading>
          <Input name="quantity" placeholder="quantidade" />
          <Input name="unit_value" placeholder="valor unitário" />
          <Input name="comment" placeholder="comentário" />
          <Input name="operation_id" placeholder="operation_id" />
          <Input name="product_id" placeholder="product_id" />

          <Button typeColor="create" type="submit">
            Inserir
          </Button>
        </Form>
      }
    />
  );
}
