import React, { useRef, useCallback } from 'react'
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
import { post } from '../../../services/api'
import { creationToast, validationErrorToast } from '../../../config/toastMessages'

interface FormData {
  inactive: string
  group_id: string
  subgroup_id: string
  automaker: string
  model: string
  year_start: string
  year_end: string
  engine: string
  complement: string
  quantity_used: string
  quantity_package: string
  size: string
  height: string
  width: string
  lenth: string
  weight: string
  inner_diameter: string
  external_diameter: string
  title: string
  name: string
  type: string
  position: string
  system: string
  color: string
  material: string
  obs: string
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
})

export default function Create() {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const router = useRouter()

  const handleSubmit = useCallback(
    async (data: FormData) => {
      const validationErrors = await validateForm(schema, data)
      if (validationErrors) {
        formRef.current?.setErrors(validationErrors)
        addToast(validationErrorToast)
        return
      }

      const response = await post('deliveries', data)
      if (response) {
        addToast(creationToast.success)
        router.push('/')
      }
    },
    [router, addToast]
  )

  return (
    <Template 
    content={
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Produtos</h1>
        <Input name="inactive" placeholder="inactive" />
        <Input name="group_id" placeholder="group_id" />
        <Input name="subgroup_id" placeholder="subgroup_id" />
        <Input name="automaker" placeholder="automaker" />
        <Input name="model" placeholder="model" />
        <Input name="year_start" placeholder="year_start" />
        <Input name="year_end" placeholder="year_end" />
        <Input name="engine" placeholder="engine" />
        <Input name="complement" placeholder="complement" />
        <Input name="quantity_used" placeholder="quantity_used" />
        <Input name="quantity_package" placeholder="quantity_package" />
        <Input name="size" placeholder="size" />
        <Input name="height" placeholder="height" />
        <Input name="width" placeholder="width" />
        <Input name="lenth" placeholder="lenth" />
        <Input name="weight" placeholder="weight" />
        <Input name="inner_diameter" placeholder="inner_diameter" />
        <Input name="external_diameter" placeholder="external_diameter" />
        <Input name="title" placeholder="title" />
        <Input name="name" placeholder="name" />
        <Input name="type" placeholder="type" />
        <Input name="position" placeholder="position" />
        <Input name="system" placeholder="system" />
        <Input name="color" placeholder="color" />
        <Input name="material" placeholder="material" />
        <Input name="obs" placeholder="obs" />
        
        <Button type="submit">Inserir</Button>
      </Form>     
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}