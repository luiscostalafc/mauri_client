/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-wrap-multilines */
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import AdminMenu from '../../../components/AdminMenu';
import Button from '../../../components/Button';
import Template from '../../../components/Template';
import { deletionToast } from '../../../config/toastMessages';
import { useToast } from '../../../hooks/toast';
import { api } from '../../../services/API';

const moduleName = '/api/operations';
export async function getStaticProps() {
  const { data } = await api.get(moduleName, { debug: true });

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
}

export default function Index({ data }: any) {
  const [dataVal, setData] = useState(data);
  const router = useRouter();
  const { addToast } = useToast();

  const columns = [
    {
      name: 'Operation',
      selector: 'operation',
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
            Edit
          </Button>
          <Button
            style={{ marginLeft: 5 }}
            typeColor="delete"
            onClick={() => remove(row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  async function remove(id: number | string) {
    if (confirm('Você tem certeza?')) {
      const { ok } = await api.delete(`${moduleName}/${id}`);
      if (ok) {
        const { data: state } = await api.get(moduleName);
        addToast(deletionToast.success);
        setData(state);
      } else {
        addToast(deletionToast.error);
      }
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
            title="Operações"
            columns={columns}
            data={dataVal}
            pagination
            highlightOnHover
            striped
            fixedHeader
          />
        </>
      }
      slider={<AdminMenu />}
      group={<></>}
    />
  );
}
