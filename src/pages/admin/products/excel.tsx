import { Heading } from '@chakra-ui/core'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useRouter } from 'next/router'
import React, { useCallback, useRef } from 'react'
import xlsxParser from 'xls-parser'
import * as Yup from 'yup'
import AdminMenu from '../../../components/AdminMenu'
import Bread from '../../../components/Breadcrumb'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Template from '../../../components/Template'
import { creationToast, validationErrorToast } from '../../../config/toastMessages'
import { useToast } from '../../../hooks/toast'
import { post } from '../../../services/api'
import { validateForm } from '../../../services/validateForm'

interface FormData {
  excel: File
}

const schema = Yup.object().shape({
  excel: Yup.string().required('Excel é obrigatório'),
})

export default function Excel() {
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

      const response = await post('products', data)
      if (response) {
        addToast(creationToast.success)
        router.push('/admin/products')
      }
    },
    [router, addToast]
  )

  const handleInput = async (e: any) => {
    const file = e.target.files[0]
    console.log(file)
    const authorizedExtensions = ['text/csv','application/vnd.oasis.opendocument.spreadsheet','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-excel']
    if (!authorizedExtensions.includes(file.type)) {
      const msg = 'Extenção inválida! deve ser: csv, ods, xlsx, xls'
      addToast({
        type: 'error',
        title: 'ERRO!',
        description: msg
      })
      return
    }
    const parsedData = await xlsxParser.onFileSelection(file)
    console.log(parsedData)
  }
  const breads = [
    { href: 'products', label: 'Produtos lista' },
    { href: '#', label: 'Produtos criar' },
  ]
  return (
    <Template
    content={
      <Form style={{ width: '80vh'}} ref={formRef} onSubmit={handleSubmit}>
        <Bread admin breads={breads}/>
        <Heading size="md">Upload de produtos via Excel</Heading>
        <Input name="excel" placeholder="Excel"  type="file" onChange={handleInput}/>
        <Button typeColor="create" type="submit">Inserir</Button>
      </Form>
    }
    slider={<AdminMenu/>}
    group={<></>}
    />
  )
}
