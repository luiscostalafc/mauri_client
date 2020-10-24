import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import  Button  from '../../../components/Button'
import Template from '../../../components/Template'
import { deleteData, get } from '../../../services/api'
import { useRouter } from 'next/router'

import { useToast } from '../../../hooks/toast'

const customStyles = {
  rows: {
    style: {

      minHeight: '72px', // override the row height
    }
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

const moduleName = 'stock-operations'
export async function getStaticProps() {
  const response = await get(moduleName)
  return {
    props: {
      data: response,
    },
  }
}

export default function Index({ data }: any) {
  const [dataVal, setData] = useState(data)
  const router = useRouter()
  const { addToast } = useToast()

  const columns = [
    { name: 'quantity', selector: 'quantity', sortable: true },
    { name: 'unit_value', selector: 'unit_value', sortable: true },
    { name: 'comment', selector: 'comment', sortable: true },
    { name: 'operation_id', selector: 'operation_id', sortable: true },
    { name: 'product_id', selector: 'product_id', sortable: true },
    {
      name: 'Actions',
      cell: (row: { id: number }) =>
      (<>
          <Button typeColor="edit" onClick={() => router.push(`/admin/${moduleName}/${row.id}`)}>Edit</Button>
          <Button style={{marginLeft:5}} typeColor="delete" onClick={() => remove(row.id)}>Delete</Button>
        </>),
    },
  ]

  async function remove (id: number | string) {
    if(confirm('Are you sure?')) {
      await deleteData(`${moduleName}/${id}`)
      const response = await get(moduleName)
      addToast({
        type: 'success',
        title: 'Apagado!',
        description: 'Dados removidos com sucesso'
      })
      setData(response)
    }
  }

  return (
    <Template
    content={
      <>
      <Button typeColor="create" onClick={() => router.push(`/admin/${moduleName}/create`)}>Criar</Button>
      <DataTable
        title="Estoque de Produtos"
        columns={columns}
        data={data}
        pagination={true}
        highlightOnHover={true}
        striped={true}
        fixedHeader={true}
        customStyles={customStyles}
      />
      </>
    }
    />
  )
}
