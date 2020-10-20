import React from 'react'
import Template from '../../components/Template'
import AdminMenu from '../../components/AdminMenu'
import { get } from '../../services/api'


export async function getStaticProps() {
  const response = await get('users', true, true)
  return {
    props: {
      data: response
    },
  }
}

export default function Index() {

  return (
    <Template
    content={<div>Index</div>}
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}
