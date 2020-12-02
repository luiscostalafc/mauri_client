import { Box, Button, Flex, Input, Select } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdArrowDropDown } from "react-icons/md";

type Options = {
  value: string | number | readonly string[] | undefined
  label: string
}

const automakers:Options[] = []
const models:Options[] = []
const yearFab:Options[] = []
const yearModel:Options[] = []
const motors:Options[] = []
const fuel:Options[] = [
  { value: "alcool", label: "Álcool"},
  { value: "gasolina", label: "Gasolina"},
]
const chassis:Options[] = []
const positions:Options[] = [
  { value: "super", label: "superior"},
  { value: "bottom", label: "inferior"},
]
const systems:Options[] = [
  { value: "alarm", label: "alarme"},
]
const materials:Options[] = [
  { value: "acrylic", label: "Acrílico"},
]
const colors:Options[] = [
  { value: "red", label: "vermelho"},
  { value: "blue", label: "azul"},
  { value: "white", label: "branco"},
  { value: "green", label: "verde"},
  { value: "yellow", label: "amarelo"},
]
const widths:Options[] = [
  { value: "25mm", label: "0,25mm"},
  { value: "50mm", label: "0,50mm"},
  { value: "75mm", label: "0,75mm"},
  { value: "100mm", label: "1,00mm"},
  { value: "125mm", label: "1,25mm"},
  { value: "150mm", label: "1,50mm"},
  { value: "175mm", label: "1,75mm"},
  { value: "200mm", label: "2,00mm"},
]
const qualities:Options[] = [
  { value: "similar", label: "Similar" },
  { value: "original", label: "Original" },
]

const AutoExpandMenu = (props: any) => {
  const { group } = props
  const [selectedGroup, setGroup] = useState(1)

  useEffect(() => {
    setGroup(group)
  },[group])
  
  function hasInGroup (values: number[]) {
    return values.indexOf(Number(selectedGroup)) != -1 ? true : false
  }

  return (
    <Flex backgroundColor="transparent" paddingLeft={5}  flexDirection="column" position="relative">
      <Box
        display="fixed"
        marginLeft={220}
        flexDirection="row"
        transformOrigin="left"
        transition="0.5s"
        {...props}
      >
        {hasInGroup([1,2]) && <Select
          _hover={{ bg: "#EDF2F7" }}
          icon={MdArrowDropDown} iconSize={8}
          backgroundImage="gray.600"
          placeholder="Montad."
          display="flex"
          height="40px"
          width="122px"
          color="gray.700"
          alignItems="center"
          justifyContent="center"
          variant="unstyled"
        >
          {automakers.length && automakers.map(({value, label}, index) => (
            <option key={index} value={value}>{label}</option>
          ))}
        </Select>}

        <Select
          icon={MdArrowDropDown} iconSize={8}
          _hover={{ bg: "#EDF2F7" }}
          variant="unstyled"
          placeholder="Modelo"
          display="flex"
          height="40px"
          width="117px"
          color="gray.700"
          alignItems="center"
          justifyContent="center"
        >
          {models.length && models.map(({value, label}, index) => (
            <option key={index} value={value}>{label}</option>
          ))}
        </Select>

        <Select
          icon={MdArrowDropDown} iconSize={8}
          _hover={{ bg: "#EDF2F7" }}
          variant="unstyled"
          placeholder="Ano-Fab"
          display="flex"
          height="40px"
          width="125px"
          color="gray.700"
          alignItems="center"
          justifyContent="center"
        >
          {yearFab.length && yearFab.map(({value, label}, index) => (
            <option key={index} value={value}>{label}</option>
          ))}
        </Select>

        {hasInGroup([1,2]) && <Select
          icon={MdArrowDropDown} iconSize={8}
          _hover={{ bg: "#EDF2F7" }}
          variant="unstyled"
          placeholder="Ano-Mod"
          display="flex"
          height="40px"
          width="130px"
          color="gray.700"
          alignItems="center"
          justifyContent="center"
        >
          {yearModel.length && yearModel.map(({value, label}, index) => (
            <option key={index} value={value}>{label}</option>
          ))}
        </Select>}

        {hasInGroup([1,2]) && <Select
          icon={MdArrowDropDown} iconSize={8}
          _hover={{ bg: "#EDF2F7" }}
          variant="unstyled"
          placeholder="Motor"
          display="flex"
          height="40px"
          width="105px"
          color="gray.700"
          alignItems="center"
          justifyContent="center"
        >
          {motors.length && motors.map(({value, label}, index) => (
            <option key={index} value={value}>{label}</option>
          ))}
        </Select>}

        {hasInGroup([1,2]) && <Select
          icon={MdArrowDropDown} iconSize={8}
          _hover={{ bg: "#EDF2F7" }}
          variant="unstyled"
          placeholder="Combust."
          display="flex"
          height="40px"
          width="132px"
          color="gray.700"
          alignItems="center"
          justifyContent="center"
        >
          {fuel.length && fuel.map(({value, label}, index) => (
            <option key={index} value={value}>{label}</option>
          ))}
        </Select>}
        {hasInGroup([1,2,3,4]) && 
          <Select
            icon={MdArrowDropDown} iconSize={8}
            _hover={{ bg: "#EDF2F7" }}
            variant="unstyled"
            placeholder="Chassi"
            display="flex"
            height="40px"
            width="110px"
            color="gray.700"
            alignItems="center"
            justifyContent="center"
          >
            {chassis.length && chassis.map(({value, label}, index) => (
              <option key={index} value={value}>{label}</option>
            ))}
          </Select>
        }
        <Input maxW="120px" size="md" />
        <Button children size="md" leftIcon={FaSearch} />
      </Box>
      <Box
        display="fixed"
        marginLeft={220}
        width="111px"
        flexDirection="row"
        transformOrigin="left"
        transition="0.5s"
        {...props}
      >
        {hasInGroup([1,2]) && <Select
          color="gray.500"
          marginBottom={1}
          variant="filled"
          placeholder="Posição"
        >
          {positions.length && positions.map(({value, label}, index) => (
            <option key={index} value={value}>{label}</option>
          ))}
        </Select>}
        {hasInGroup([1,2]) && <Select
          color="gray.500"
          marginBottom={1}
          variant="filled"
          placeholder="Sistema"
        >
          {systems.length && systems.map(({value, label}, index) => (
            <option key={index} value={value}>{label}</option>
          ))}
        </Select>}
        {hasInGroup([1,2]) && <Select
          color="gray.500"
          marginBottom={1}
          variant="filled"
          placeholder="Material"
        >
          {materials.length && materials.map(({value, label}, index) => (
            <option key={index} value={value}>{label}</option>
          ))}
        </Select>}
        {hasInGroup([1,2]) && <Select
          color="gray.500"
          marginBottom={1}
          variant="filled"
          placeholder="Cor"
        >
          {colors.length && colors.map(({value, label}, index) => (
            <option key={index} value={value}>{label}</option>
          ))}
          
        </Select>}
        {hasInGroup([1,2]) && <Select
          color="gray.500"
          marginBottom={1}
          variant="filled"
          placeholder="Medida"
        >
          {widths.length && widths.map(({value, label}, index) => (
            <option key={index} value={value}>{label}</option>
          ))}
        </Select>}
        {hasInGroup([1,2]) && <Select color="gray.500" variant="filled" placeholder="Qualidade">
          {qualities.length && qualities.map(({value, label}, index) => (
            <option key={index} value={value}>{label}</option>
          ))}
        </Select>}
      </Box>
    </Flex>
  )
}

export default AutoExpandMenu
