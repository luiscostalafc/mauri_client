import React from 'react'
import DataTable from 'react-data-table-component'
import Template from '../../../components/Template'
import AdminMenu from '../../../components/AdminMenu'
import api from '../../../services/api'


const columns = [
  {
    name: 'Operation',
    selector: 'operation',
    sortable: true,
  },
]

export async function getStaticProps() {
  const response = await api.get('/operations')
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
        title="Operation"
        columns={columns}
        data={data}
      />
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}