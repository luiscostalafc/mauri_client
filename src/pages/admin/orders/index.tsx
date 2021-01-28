/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-wrap-multilines */
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import AdminMenu from '../../../components/AdminMenu';
import Button from '../../../components/Button';
import Template from '../../../components/Template';
import { deletionToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
import { deleteData, get } from '../../../services/api';

const customStyles = {
  rows: {
    style: {
      minHeight: '72px', // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '10px', // override the cell padding for data cells
      paddingRight: '10px',
    },
  },
};

const moduleName = 'orders';
export async function getStaticProps() {
  const response = await get(moduleName);
  return {
    props: {
      data: response,
    },
  };
}

export default function Index({ data }: any) {
  const [dataVal, setData] = useState(data);
  const router = useRouter();
  const { addToast } = useToast();

  const columns = [
    { name: 'Nome', selector: 'name', sortable: true },
    { name: 'Atividade', selector: 'activity', sortable: true },
    { name: 'Email', selector: 'email', sortable: true },
    { name: 'RG', selector: 'rg', sortable: true },
    { name: 'Status', selector: 'order_status', sortable: true },
    { name: 'Entrega', selector: 'delivery', sortable: true },
    {
      name: 'Actions',
      cell: (row: { id: number }) => (
        <>
          <Button
            typeColor="edit"
            onClick={() => router.push(`/admin/${moduleName}/${row.id}`)}
          >
            Editar
          </Button>
          <Button
            style={{ marginLeft: 5 }}
            typeColor="delete"
            onClick={() => remove(row.id)}
          >
            Apagar
          </Button>
        </>
      ),
    },
  ];

  async function remove(id: number | string) {
    if (confirm('Você tem certeza?')) {
      await deleteData(`${moduleName}/${id}`);
      const response = await get(moduleName);
      addToast(deletionToast.success);
      setData(response);
    }
  }

  return (
    <Template
      content={
        <>
          <Button
            typeColor="create"
            onClick={() => router.push(`/admin/${moduleName}/create`)}
          >
            Criar
          </Button>
          <DataTable
            title="Pedidos"
            columns={columns}
            data={dataVal}
            pagination
            highlightOnHover
            striped
            fixedHeader
            customStyles={customStyles}
          />
        </>
      }
      slider={<AdminMenu />}
      group={<></>}
    />
  );
}
