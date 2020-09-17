import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Template from '../../../components/Template'
import AdminMenu from '../../../components/AdminMenu'

import api from '../../../services/api'
import { useRouter } from 'next/router'

function Edit() {
  const router = useRouter();
  const { id } = router.query;
  // const response = await api.get('/users')
  // const data = response.data || []

  return (
    <Template 
    content={<div>{id}</div>}
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}

// export async function getStaticPaths(params : GetStaticPaths) {
//   const response = await api.get('/users')
//   const data = response.data || []
  
//   const paths = data.map((d) => `admin/users/${d.id}`)
//   return { paths, fallback: true }
// }

export default Edit