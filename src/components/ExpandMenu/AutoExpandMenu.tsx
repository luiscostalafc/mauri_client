import React from 'react'
import { Input, Flex, Box, Select, Button } from '@chakra-ui/core'

import { FaSearch } from 'react-icons/fa'
import { MdArrowDropDown } from "react-icons/md";




const AutoExpandMenu = (props: any) => {
  return (
    <Flex backgroundColor="transparent"  flexDirection="row" position="fixed">
      <Box
        display="flex"
        marginLeft={-400}
        flexDirection="row"
        transformOrigin="left"
        transition="0.5s"
        {...props}
      >
        <Select
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
        ></Select>

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
        ></Select>

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
        ></Select>

        <Select
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
        ></Select>

        <Select
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
        ></Select>

        <Select
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
        ></Select>
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
        ></Select>

        <Input maxW="120px" size="md" />
        <Button children size="md" leftIcon={FaSearch} />
      </Box>
    </Flex>
  )
}

export default AutoExpandMenu
