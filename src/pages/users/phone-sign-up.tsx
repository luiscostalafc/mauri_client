import React, { useCallback, useRef, useState } from 'react'
import { Switch, Flex } from "@chakra-ui/core";
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FiArrowLeft, FiPhone, FiSmartphone, FiFileText } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import {
  DivContainer, Container,
  Content,
  AnimationContainer,
  SelectContainer,
  Background,
  ImageCart,
} from '../../styles/pages/phone-sign-up'

import api from '../../services/api'

import { useToast } from '../../hooks/toast'

import getValidationErrors from '../../utils/getValidationErrors'

import Button from '../../components/Button'
import Input from '../../components/Input'
import InputMask from '../../components/InputMask'
import SelectInput from '../../components/SelectInput'



interface PhoneFormData {
  user_id: string
  type: string
  phone: string
  whatsapp: boolean
  obs?: string
}


const PhoneSignUp: React.FC = () => {
  const [searchOption, setSearchOption] = useState('residencial');
  const [optionSelected, setOptionSelected] = useState<string>('');
  const [withWhatsapp, setWithWhatsapp] = useState(true);


  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const router = useRouter()


  const optionsSelect = [
    { value: 'residencial', label: 'residencial' },
    { value: 'comercial', label: 'comercial' },
  ];


  const toggleOption = useCallback(() => {
    setSearchOption(state => (state === 'residencial' ? 'comercial' : 'residencial'));
    setOptionSelected('');
    formRef.current?.clearField('residencial');
  }, []);

  function handleWhatsapp() {
    withWhatsapp ? setWithWhatsapp(false) : setWithWhatsapp(true)
  }
  console.log(withWhatsapp)



  const handleSubmit = useCallback(

    async (data: PhoneFormData) => {
      try {
        const userId = Cookies.get('@Liconnection:user')

        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          type: Yup.string().required('Tipo do telefone deve ser selecionado'),
          phone: Yup.string().required('Preencha o telefone com o DDD'),
          whatsapp: Yup.boolean().default(true),
          obs: Yup.string().optional(),
          user_id: Yup.string().default(userId)
        })
        await schema.validate(data, {
          abortEarly: false
        })

        const dataUser = {...data, user_id: userId, whatsapp: withWhatsapp}

        console.log(dataUser)

        const response = await api.post('phones', dataUser)

        console.log(response)

        router.push('address-sign-up')

        addToast({
          type: 'success',
          title: 'Cadastro dos dados telefônicos realizado com sucesso!',
          description: 'Agora falta pouco... Preencha seu dados de endereço'
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          console.log(err)
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
              <InputMask mask="(99) 9999-9999" name="phone" icon={FiPhone} placeholder="número com o DDD" />
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
              <InputMask mask="(99) 99999-9999" name="phone" icon={FiSmartphone} placeholder="número com o DDD" />
              <Flex justify="center" align="center" width={200}>
                <FaWhatsapp style={{ marginTop: 10 }} size="50px" color="128c7e" />
                <Switch name="whatsapp" id="whatsapp" onChange={handleWhatsapp} isChecked={withWhatsapp} />
              </Flex>
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

      <Background>
        <ImageCart src="../liconnection_logo.jpeg" />
      </Background>
    </Container>
  )
}

export default PhoneSignUp

