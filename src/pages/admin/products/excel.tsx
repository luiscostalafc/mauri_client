/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Heading } from '@chakra-ui/core';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import React, { useCallback, useRef, useState } from 'react';
import AdminMenu from '../../../components/AdminMenu';
import Bread from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Template from '../../../components/Template';
import { creationToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
//import { post } from '../../../services/api';
import api from '../../../services/api';

import {
  checkExtension,
  checkFormat,
  formatSend,
  formatSheet,
  // eslint-disable-next-line prettier/prettier
  sheetToJson
} from '../../../utils/uploadExcel';

export default function Excel() {
  const formRef = useRef<FormHandles>(null);
  const [excel, setExcel] = useState();
  const { addToast } = useToast();

  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    if (!excel) {
      addToast({
        title: 'Erro',
        description: 'Excel é obrigatório',
      });
      return;
    }

    const response = await api.post('/api/products/excel', excel);
    if (response) {
      addToast(creationToast.success);
      router.push('/admin/products');
    }
  }, [excel, router, addToast]);

  const handleInput = async (e: any) => {
    const file = e.target.files[0];
    const validExtension = checkExtension(file);
    if (!validExtension) {
      const msg = 'Extenção inválida! deve ser: csv, ods, xlsx, xls';
      addToast({
        type: 'error',
        title: 'ERRO!',
        description: msg,
      });
      return;
    }
    const parsedData = await sheetToJson(file);
    const validFormat = checkFormat(parsedData);
    if (!validFormat) {
      addToast({
        type: 'error',
        title: 'ERRO!',
        description:
          'Formato das colunas da planilha inválido! Verifique o formato padrão',
      });
      addToast({
        type: 'error',
        title: 'ERRO!',
        description: formatSheet.join(', '),
      });
      return;
    }

    const excelData: any = formatSend(parsedData);
    setExcel(excelData);
  };

  const breads = [
    { href: 'products', label: 'Produtos lista' },
    { href: '#', label: 'Produtos criar' },
  ];
  return (
    <Template
      content={
        <Form style={{ width: '80vh' }} ref={formRef} onSubmit={handleSubmit}>
          <Bread admin breads={breads} />
          <Heading size="md">Upload de produtos via Excel</Heading>
          <Input
            name="excel"
            placeholder="Excel"
            type="file"
            onChange={handleInput}
          />
          <Button typeColor="create" type="submit">
            Inserir
          </Button>
        </Form>
      }
      slider={<AdminMenu />}
      group={<></>}
    />
  );
}
