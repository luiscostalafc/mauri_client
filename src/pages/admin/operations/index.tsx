import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Button } from "@chakra-ui/core"
import Template from '../../../components/Template'
import AdminMenu from '../../../components/AdminMenu'
import { deleteData, get } from '../../../services/api'
import { useRouter } from 'next/router'

import { useToast } from '../../../hooks/toast'

const moduleName = 'operations'
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
    {
      name: 'Operation',
      selector: 'operation',
      sortable: true,
    },
    { 
      name: 'Actions', 
      cell: (row: { id: number }) => 
      (<>
          <Button onClick={() => router.push(`/admin/${moduleName}/${row.id}`)}>Edit</Button>
          <Button onClick={() => remove(row.id)}>Delete</Button>
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
      <DataTable
        title="Operation"
        columns={columns}
        data={dataVal}
        pagination={true}
        highlightOnHover={true}
        striped={true}
        fixedHeader={true}
      />
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}