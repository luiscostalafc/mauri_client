import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import AdminMenu from '../../../components/AdminMenu';
import Bread from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Template from '../../../components/Template';
import {
  creationToast,
  validationErrorToast
} from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
import { post } from '../../../services/api';
import { validateForm } from '../../../services/validateForm';

interface FormData {
  operation: string;
}

const schema = Yup.object().shape({
  operation: Yup.string().required('Operação é obrigatória'),
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

      const response = await post('operations', data);
      if (response) {
        addToast(creationToast.success);
        router.push('/admin/operations');
      }
    },
    [router, addToast],
  );
  const breads = [
    { href: 'operations', label: 'Operações lista' },
    { href: '#', label: 'Operações criar' },
  ];
  return (
    <Template
      content={(
        <Form style={{ width: '80vh' }} ref={formRef} onSubmit={handleSubmit}>
          <Bread admin breads={breads} />
          <h1>Operações</h1>
          <Input name="operation" placeholder="Operação" />
          <Button typeColor="create" type="submit">
            Inserir
          </Button>
        </Form>
      )}
      slider={<AdminMenu />}
      group={<></>}
    />
  );
}
