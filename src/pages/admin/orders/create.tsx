import React, { useRef, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import Template from '../../../components/Template'
import AdminMenu from '../../../components/AdminMenu'

import { FormHandles } from '@unform/core'

import { useToast } from '../../../hooks/toast'

import Button from '../../../components/Button'
import Input from '../../../components/Input'

import { validateForm } from '../../../services/validateForm'
import { post, get } from '../../../services/api'
import { creationToast, validationErrorToast } from '../../../config/toastMessages'
import SelectInput from '../../../components/SelectInput'

interface FormData {
  user_id: number
  provider_id: number
  order_status_id: number
  delivery_id: number
}

const schema = Yup.object().shape({
  user_id: Yup.number().required('Usuário é obrigatório'),
  provider_id: Yup.number().required('Prestador obrigatório'),
  order_status_id: Yup.number().required('Status obrigatório'),
  delivery_id: Yup.number().required('Status obrigatório'),
})

const moduleName = 'orders'
export default function Create() {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  const router = useRouter()

  const [users, setUsers] = useState([])
  const [providers, setProviders] = useState([])
  const [orderStatus, setOrderStatus] = useState([])
  const [deliveries, setDeliveries] = useState([])

  const getUsers = useCallback(async () => {
    const response = await get('users')
    const input = response.map(r => {
      return {
        value: r.id,
        label: r.name,
      }
    })
    console.log(input)
    setUsers(input)
  },[users])

  const getProviders = useCallback(async () => {
    const response = await get('users')
    const input = response.map(r => {
      return {
        value: r.id,
        label: r.name,
      }
    })
    console.log(input)
    setProviders(input)
  },[users])

  const getStatus = useCallback(async () => {
    const response = await get('order-statuses')
    const input = response.map(r => {
      return {
        value: r.id,
        label: r.order_status,
      }
    })
    console.log(input)
    setOrderStatus(input)
  },[users])

  const getDeliveries = useCallback(async () => {
    const response = await get('deliveries')
    const input = response.map(r => {
      return {
        value: r.id,
        label: r.delivery,
      }
    })
    console.log(input)
    setDeliveries(input)
  },[users])

  useEffect(() => {
    getUsers()
    getProviders()
    getStatus()
    getDeliveries()
  },[])


  const handleSubmit = useCallback(
    async (data: FormData) => {
      const validationErrors = await validateForm(schema, data)
      if (validationErrors) {
        formRef.current?.setErrors(validationErrors)
        addToast(validationErrorToast)
        return
      }

      const response = await post(moduleName, data)
      if (response) {
        addToast(creationToast.success)
        router.push(`/admin/${moduleName}`)
      }
    },
    [router, addToast]
  )

  return (
    <Template 
    content={
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Pedidos</h1>
        <SelectInput name="user_id" placeholder="Usuário" options={users}/>
        <SelectInput name="provider_id" placeholder="Prestador" options={providers}/>
        <SelectInput name="order_status_id" placeholder="Estatus Ordem" options={orderStatus}/>
        <SelectInput name="delivery_id" placeholder="Entrega" options={deliveries}/>

        <Button type="submit">Inserir</Button>
      </Form>     
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}