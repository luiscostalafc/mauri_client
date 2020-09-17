import React from 'react'
import DataTable from 'react-data-table-component'
import Template from '../../../components/Template'
import AdminMenu from '../../../components/AdminMenu'
import api from '../../../services/api'


const columns = [
  { name: 'inactive', selector: 'inactive', sortable: true, },
  { name: 'group_id', selector: 'group_id', sortable: true, },
  { name: 'subgroup_id', selector: 'subgroup_id', sortable: true, },
  { name: 'automaker', selector: 'automaker', sortable: true, },
  { name: 'model', selector: 'model', sortable: true, },
  { name: 'year_start', selector: 'year_start', sortable: true, },
  { name: 'year_end', selector: 'year_end', sortable: true, },
  { name: 'engine', selector: 'engine', sortable: true, },
  { name: 'complement', selector: 'complement', sortable: true, },
  { name: 'quantity_used', selector: 'quantity_used', sortable: true, },
  { name: 'quantity_package', selector: 'quantity_package', sortable: true, },
  { name: 'size', selector: 'size', sortable: true, },
  { name: 'height', selector: 'height', sortable: true, },
  { name: 'width', selector: 'width', sortable: true, },
  { name: 'lenth', selector: 'lenth', sortable: true, },
  { name: 'weight', selector: 'weight', sortable: true, },
  { name: 'inner_diameter', selector: 'inner_diameter', sortable: true, },
  { name: 'external_diameter', selector: 'external_diameter', sortable: true, },
  { name: 'title', selector: 'title', sortable: true, },
  { name: 'name', selector: 'name', sortable: true, },
  { name: 'type', selector: 'type', sortable: true, },
  { name: 'position', selector: 'position', sortable: true, },
  { name: 'system', selector: 'system', sortable: true, },
  { name: 'color', selector: 'color', sortable: true, },
  { name: 'material', selector: 'material', sortable: true, },
  { name: 'obs', selector: 'obs', sortable: true, },
]

export async function getStaticProps() {
  const response = await api.get('/products')
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
        title="Products"
        columns={columns}
        data={data}
      />
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}