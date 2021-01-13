import { useRouter } from 'next/router'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { FiDelete, FiEdit } from 'react-icons/fi'
import AdminMenu from '../../../components/AdminMenu'
import Button from '../../../components/Button'
import Template from '../../../components/Template'
import { useToast } from '../../../hooks/toast'
import { deleteData, get } from '../../../services/api'


const moduleName = 'users'
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
    { name: 'Name', selector: 'name', sortable: true, },
    { name: 'Username', selector: 'username', sortable: true, },
    { name: 'activity', selector: 'activity', sortable: true, },
    { name: 'complete_name', selector: 'complete_name', sortable: true, },
    { name: 'email', selector: 'email', sortable: true, },
    { name: 'rg', selector: 'rg', sortable: true, },
    { name: 'cpf_cnpj', selector: 'cpf_cnpj', sortable: true, },
    { name: 'nick', selector: 'nick', sortable: true, },
    { name: 'is_provider', selector: 'is_provider', sortable: true, },
    { name: 'inactive', selector: 'inactive', sortable: true, },
    {
      name: 'Actions',
      cell: (row: { id: number }) =>
      (<>
          <Button typeColor="edit"  onClick={() => router.push(`/admin/${moduleName}/${row.id}`)}>< FiEdit /></Button>
          <Button typeColor="delete" style={{marginLeft: 5}} onClick={() => remove(row.id)}>< FiDelete /></Button>
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
        title="Usuários"
        columns={columns}
        data={dataVal}
        pagination={true}
        highlightOnHover={true}
        striped={true}
        fixedHeader={true}
        responsive={true}
      />
      </>
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}
