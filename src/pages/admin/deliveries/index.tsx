import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { Button, Flex } from "@chakra-ui/core"
import Template from '../../../components/Template'
import AdminMenu from '../../../components/AdminMenu'
import { deleteData, get } from '../../../services/api'
import { useRouter } from 'next/router'

import { useToast } from '../../../hooks/toast'
import { deletionToast } from '../../../config/toastMessages'

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

const moduleName = 'deliveries'
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
    { name: 'Delivery', selector: 'delivery', sortable: true,},
    { name: 'Inactive', selector: 'inactive', cell: (row: any) => row.inactive ? 'Yes' : 'No', sortable: true,},
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
    if(confirm('Você tem certeza?')) {
      await deleteData(`${moduleName}/${id}`)
      const response = await get(moduleName)
      addToast(deletionToast.success)
      setData(response)
    }
  }

  return (
    <Template
    content={
      <>
      <Button onClick={() => router.push(`/admin/${moduleName}/create`)}>Criar</Button>
      <DataTable
        title="Deliveries"
        columns={columns}
        data={dataVal}
        pagination={true}
        highlightOnHover={true}
        striped={true}
        fixedHeader={true}
        customStyles={customStyles}
      />
      </>
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}
