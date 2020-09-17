import React from 'react'
import DataTable from 'react-data-table-component'
import Template from '../../../components/Template'
import AdminMenu from '../../../components/AdminMenu'
import api from '../../../services/api'
import { Link } from '@chakra-ui/core'


const columns = [
  { name: 'quantity', selector: 'quantity', sortable: true },
  { name: 'unit_value', selector: 'unit_value', sortable: true },
  { name: 'comment', selector: 'comment', sortable: true },
  { name: 'operation_id', selector: 'operation_id', sortable: true },
  { name: 'product_id', selector: 'product_id', sortable: true },
  { 
    name: 'Edit', 
    button: true,
    cell: (row: { id: number }) => <Link href={`stock-operations/${row.id}`}>Edit</Link>,
  },
  { 
    name: 'Remove', 
    button: true,
    cell: (row: { id: number }) => <Link href={`stock-operations/${row.id}`}>Edit</Link>,
  },
]

export async function getStaticProps() {
  const response = await api.get('/stock-operations')
  return {
    props: {
      data: response.data || [],
    },
  }
}

export default function Index({ data }) {

  return (
    <Template 
    content={
      <DataTable
        title="Stock Operations"
        columns={columns}
        data={data}
      />
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}