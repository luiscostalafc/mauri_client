import React from 'react'
import Template from '../../components/Template'
import AdminMenu from '../../components/AdminMenu'
import api from '../../services/api'


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
    content={Index}
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}