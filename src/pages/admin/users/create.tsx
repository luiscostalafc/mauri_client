import React from 'react'
import Template from '../../../components/Template'
import AdminMenu from '../../../components/AdminMenu'

export default function Index() {

  return (
    <Template 
    content={<div>Users</div>}
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}