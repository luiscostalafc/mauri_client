import { useRouter } from 'next/router';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FiDelete, FiEdit } from 'react-icons/fi';
import AdminMenu from '../../../components/AdminMenu';
import Button from '../../../components/Button';
import Template from '../../../components/Template';
import { useToast } from '../../../hooks/toast';
import { deleteData, get } from '../../../services/api';

const moduleName = 'products';
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
    { name: 'inactive', selector: 'inactive', sortable: true },
    { name: 'group_id', selector: 'group_id', sortable: true },
    { name: 'subgroup_id', selector: 'subgroup_id', sortable: true },
    { name: 'automaker', selector: 'automaker', sortable: true },
    { name: 'model', selector: 'model', sortable: true },
    { name: 'year_start', selector: 'year_start', sortable: true },
    { name: 'year_end', selector: 'year_end', sortable: true },
    { name: 'engine', selector: 'engine', sortable: true },
    { name: 'complement', selector: 'complement', sortable: true },
    { name: 'quantity_used', selector: 'quantity_used', sortable: true },
    { name: 'quantity_package', selector: 'quantity_package', sortable: true },
    { name: 'size', selector: 'size', sortable: true },
    { name: 'height', selector: 'height', sortable: true },
    { name: 'width', selector: 'width', sortable: true },
    { name: 'lenth', selector: 'lenth', sortable: true },
    { name: 'weight', selector: 'weight', sortable: true },
    { name: 'inner_diameter', selector: 'inner_diameter', sortable: true },
    {
      name: 'external_diameter',
      selector: 'external_diameter',
      sortable: true,
    },
    { name: 'title', selector: 'title', sortable: true },
    { name: 'name', selector: 'name', sortable: true },
    { name: 'type', selector: 'type', sortable: true },
    { name: 'position', selector: 'position', sortable: true },
    { name: 'system', selector: 'system', sortable: true },
    { name: 'color', selector: 'color', sortable: true },
    { name: 'material', selector: 'material', sortable: true },
    { name: 'obs', selector: 'obs', sortable: true },
    {
      name: 'Actions',
      cell: (row: { id: number }) => (
        <>
          <Button
            typeColor="edit"
            onClick={() => router.push(`/admin/${moduleName}/${row.id}`)}
          >
            <FiEdit />
          </Button>
          <Button
            style={{ marginLeft: 5 }}
            typeColor="delete"
            onClick={() => remove(row.id)}
          >
            <FiDelete />
          </Button>
        </>
      ),
    },
  ];

  async function remove(id: number | string) {
    if (confirm('Are you sure?')) {
      await deleteData(`${moduleName}/${id}`);
      const response = await get(moduleName);
      addToast({
        type: 'success',
        title: 'Apagado!',
        description: 'Dados removidos com sucesso',
      });
      setData(response);
    }
  }

  return (
    <Template
      content={(
        <>
          <Button
            typeColor="create"
            onClick={() => router.push(`/admin/${moduleName}/create`)}
          >
            Criar
          </Button>
          <Button
            typeColor="create"
            onClick={() => router.push(`/admin/${moduleName}/excel`)}
          >
            Inserção via Excel
          </Button>
          <DataTable
            title="Produtos"
            columns={columns}
            data={dataVal}
            pagination
            highlightOnHover
            striped
            fixedHeader
            responsive
          />
        </>
      )}
      slider={<AdminMenu />}
      group={<></>}
    />
  );
}
