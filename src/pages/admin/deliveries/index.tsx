import React from 'react'
import DataTable from 'react-data-table-component'
import Template from '../../../components/Template'
import AdminMenu from '../../../components/AdminMenu'
import api from '../../../services/api'


const columns = [
  {
    name: 'Delivery',
    selector: 'delivery',
    sortable: true,
  },
  {
    name: 'Inactive',
    selector: 'inactive',
    sortable: true,
  },
]

export async function getStaticProps() {
  const response = await api.get('deliveries')
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
        title="Deliveries"
        columns={columns}
        data={data}
      />
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}