import { Heading } from '@chakra-ui/core'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useRouter } from 'next/router'
import React, { useCallback, useRef } from 'react'
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
import { checkExtension, checkFormat, formatSheet, sheetToJson } from '../../../utils/uploadExcel'

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
    const validExtension = checkExtension(file)
    console.log(validExtension)
    if (!validExtension) {
      const msg = 'Extenção inválida! deve ser: csv, ods, xlsx, xls'
      addToast({
        type: 'error',
        title: 'ERRO!',
        description: msg
      })
      return 
    }  
    const parsedData = await sheetToJson(file)

    const validFormat = checkFormat(parsedData)
    if (!validFormat) {
      addToast({
        type: 'error',
        title: 'ERRO!',
        description: 'Formato das colunas da planilha inválido! Verifique o formato padrão'
      })
      addToast({
        type: 'error',
        title: 'ERRO!',
        description: formatSheet.join(', ')
      })
      return 
    }
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
