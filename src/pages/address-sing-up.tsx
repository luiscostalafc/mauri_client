import React, { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FiArrowLeft, FiPhone, FiSmartphone, FiFileText} from 'react-icons/fi'
import { FaWhatsapp} from 'react-icons/fa'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import {
  DivContainer, Container,
  Content,
  AnimationContainer,
  SelectContainer,
} from '../styles/pages/address-sign-up'

import api from '../services/api'

import { useToast } from '../hooks/toast'

import getValidationErrors from '../utils/getValidationErrors'

import Button from '../components/Button'
import Input from '../components/Input'
import InputMask from '../components/InputMask'
import SelectInput from '../components/SelectInput'
import CheckboxInput from '../components/CheckBoxInput'

interface CheckboxOption {
  id: string
  value: string
  label: string
}


interface PhoneFormData {
  type: string
  numberPhone: [{
    area_code: string
    phone: string
  }]
  whatsapp: boolean
  obs?: string
}



const AddressSignUp: React.FC = () => {
  const [searchOption, setSearchOption] = useState('residencial');
  const [optionSelected, setOptionSelected] = useState<string>('');
  const [withWhatsapp, setWithWhatsapp ] = useState(true);


  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const router = useRouter()

  const checkboxOption: CheckboxOption[] = [
    {id: 'whatsApp', value: 'whatsApp', label: 'Whatsapp'}
  ]

  const optionsSelect = [
    { value: 'residencial', label: 'residencial' },
    { value: 'comercial', label: 'comercial' },
  ];



  const toggleOption = useCallback(() => {
    setSearchOption(state => (state === 'residencial' ? 'comercial' : 'residencial'));
    setOptionSelected('');
    formRef.current?.clearField('residencial');
  }, []);

  const whatsOption = useCallback(() => {
     if(withWhatsapp === true) {
      setWithWhatsapp(false)
     } else {
       setWithWhatsapp(true)
     }

  }, [])


  const handleSubmit = useCallback(
    async (data: PhoneFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          type: Yup.string().required('Tipo do telefone deve ser selecionado'),
          numberPhone: Yup.string().required('Preencha o telefone com o DDD'),
          whatsapp: Yup.boolean().required('Esse número possui Whatsapp?'),
          obs: Yup.string().optional(),
        })
        await schema.validate(data, {
          abortEarly: false
        })
        await api.post('phones', data)

        router.push('address-sing-up')

        addToast({
          type: 'success',
          title: 'Cadastro dos dados telefônicos realizado com sucesso!',
          description: 'Agora falta pouco... Preencha seu dados de endereço'
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'info',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer seu cadastro. Verifique seus dados e tente novamente.'
        })
      }
    },
    [addToast, router]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>


          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Contatos</h1>

            <DivContainer>
              <InputMask mask="(99) 9999-9999" name="numberPhone" icon={FiPhone} placeholder="número com o DDD" />
              <SelectContainer>
              <SelectInput
                name="type"
                defaultValue={{ value: 'residencial', label: 'residencial' }}
                onChange={toggleOption}
                options={optionsSelect}
              />
              </SelectContainer>
            </DivContainer>

            <DivContainer>
              <InputMask mask="(99) 99999-9999" name="numberPhone" icon={FiSmartphone} placeholder="número com o DDD" />
              <CheckboxInput defaultChecked={withWhatsapp} onChange={whatsOption} name="whatsapp" options={checkboxOption}/>
              <FaWhatsapp style={{marginTop:10}}  size="50px" color="128c7e"/>
            </DivContainer>

            <Input name="obs" icon={FiFileText} placeholder="Observações" />

            <Button type="submit">
              Avançar para endereço {'>>'}
            </Button>
          </Form>
          <Link href="sign-up">
            <a>
              <FiArrowLeft />
              Voltar aos Dados do usuário
            </a>
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default AddressSignUp

