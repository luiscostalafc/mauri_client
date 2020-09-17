import React from 'react'
import DataTable from 'react-data-table-component'
import Template from '../../../components/Template'
import AdminMenu from '../../../components/AdminMenu'
import api from '../../../services/api'


const columns = [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Username',
    selector: 'username',
    sortable: true,
  },
  {
    name: 'activity',
    selector: 'activity',
    sortable: true,
  },
  {
    name: 'complete_name',
    selector: 'complete_name',
    sortable: true,
  },
  {
    name: 'email',
    selector: 'email',
    sortable: true,
  },
  {
    name: 'rg',
    selector: 'rg',
    sortable: true,
  },
  {
    name: 'cpf_cnpj',
    selector: 'cpf_cnpj',
    sortable: true,
  },
  {
    name: 'nick',
    selector: 'nick',
    sortable: true,
  },
  {
    name: 'is_provider',
    selector: 'is_provider',
    sortable: true,
  },
  {
    name: 'inactive',
    selector: 'inactive',
    sortable: true,
  },
]

export async function getStaticProps() {
  const response = await api.get('/users')
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
        title="Users"
        columns={columns}
        data={data}
      />
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}