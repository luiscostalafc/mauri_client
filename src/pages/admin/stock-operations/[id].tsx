/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Heading } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef } from 'react';
import * as Yup from 'yup';
import Bread from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Template from '../../../components/Template';
import { updateToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
// import { get, put } from '../../../services/API';
import { api } from '../../../services/API/index';
import { validateForm, validationErrors } from '../../../services/validateForm';

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

const moduleName = '/api/stock-operations';
export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    if (id) {
      api
        .get(`${moduleName}/${id}`)
        .then(({ data }) =>
          formRef.current?.setData(data as Record<string, unknown>),
        );
    }
  }, [id]);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      const { hasErrors, toForm, toToast } = await validateForm(schema, data);
      if (hasErrors) {
        formRef.current?.setErrors(toForm);
        toToast.map(({ path, message }) =>
          addToast(validationErrors({ path, message })),
        );
      }

      const { ok, messageErrors } = await api.put(`${moduleName}/${id}`, data);
      if (ok) {
        addToast(updateToast.success);
        router.push(`/admin/${moduleName}`);
      } else {
        messageErrors?.length &&
          messageErrors.map(({ path, message }) =>
            addToast(validationErrors({ path, message })),
          );
      }
    },
    [router, addToast, id],
  );
  const breads = [
    { href: 'stock-operations', label: 'Operações de Estoque lista' },
    { href: '#', label: 'Operações de Estoque editar' },
  ];
  return (
    <Template
      content={
        <Form style={{ width: '80vh' }} ref={formRef} onSubmit={handleSubmit}>
          <Bread admin breads={breads} />
          <Heading size="md">Operações de Estoque</Heading>
          <Input name="quantity" placeholder="quantidade" />
          <Input name="unit_value" placeholder="unidade de medida" />
          <Input name="comment" placeholder="comentário" />
          <Input name="operation_id" placeholder="operation_id" />
          <Input name="product_id" placeholder="product_id" />

          <Button typeColor="create" type="submit">
            Editar
          </Button>
        </Form>
      }
    />
  );
}
