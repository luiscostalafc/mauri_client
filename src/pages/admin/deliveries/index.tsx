/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from '../../../components/Button';
import Template from '../../../components/Template';
import { deletionToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
// import AdminMenu from '../../../components/AdminMenu'
import { deleteData } from '../../../services/api';
import api from '../../../services/api';

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
      maxWidht: '100vh',
      paddingLeft: '10px', // override the cell padding for data cells
      paddingRight: '10px',
    },
  },
};

const moduleName = '/api/deliveries';
export async function getStaticProps() {
  const response = await api.get(moduleName);
  return {
    props: {
      data: response.data,
    },
  };
}

export default function Index({ data }: any) {
  const [dataVal, setData] = useState(data);
  // const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { addToast } = useToast();

  const columns = [
    { name: 'Entrega', selector: 'delivery', sortable: true },
    {
      name: 'Inactivo',
      selector: 'inactive',
      cell: (row: any) => (row.inactive ? 'Sim' : 'Não'),
      sortable: true,
    },
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
      const response = await api.get(moduleName);
      addToast(deletionToast.success);
      setData(response.data);
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
            title="Entregas"
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
    />
  );
}
