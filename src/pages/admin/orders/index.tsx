import React from 'react'
import DataTable from 'react-data-table-component'
import Template from '../../../components/Template'
import AdminMenu from '../../../components/AdminMenu'
import api from '../../../services/api'


const columns = [
  {
    name: 'user_id',
    selector: 'user_id',
    sortable: true,
  },
  {
    name: 'provider_id',
    selector: 'provider_id',
    sortable: true,
  },
  {
    name: 'order_status_id',
    selector: 'order_status_id',
    sortable: true,
  },
]

export async function getStaticProps() {
  const response = await api.get('/orders')
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
        title="Orders (preciso arrumar os joins)"
        columns={columns}
        data={data}
      />
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}