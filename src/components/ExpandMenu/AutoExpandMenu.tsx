import React from 'react'
import { Input, Flex, Box, Select, Button } from '@chakra-ui/core'

import { FaSearch } from 'react-icons/fa'




const AutoExpandMenu = (props: any) => {
  return (
    <Flex flexDirection="row" position="relative">
      <Box
        display="flex"
        marginLeft={100}
        flexDirection="row"
        transformOrigin="left"
        transition="0.5s"
        {...props}
      >
        <Select
          variant="filled"
          placeholder="Montad."
          display="flex"
          height="40px"
          width="122px"
          color="gray.500"
          alignItems="center"
          justifyContent="center"
        ></Select>

        <Select
          variant="filled"
          placeholder="Modelo"
          display="flex"
          height="40px"
          width="117px"
          color="gray.500"
          alignItems="center"
          justifyContent="center"
        ></Select>

        <Select
          variant="filled"
          placeholder="Ano-Fab"
          display="flex"
          height="40px"
          width="125px"
          color="gray.500"
          alignItems="center"
          justifyContent="center"
        ></Select>

        <Select
          variant="filled"
          placeholder="Ano-Mod"
          display="flex"
          height="40px"
          width="130px"
          color="gray.500"
          alignItems="center"
          justifyContent="center"
        ></Select>

        <Select
          variant="filled"
          placeholder="Motor"
          display="flex"
          height="40px"
          width="105px"
          color="gray.500"
          alignItems="center"
          justifyContent="center"
        ></Select>

        <Select
          variant="filled"
          placeholder="Combust."
          display="flex"
          height="40px"
          width="132px"
          color="gray.500"
          alignItems="center"
          justifyContent="center"
        ></Select>
        <Select
          variant="filled"
          placeholder="Chassi"
          display="flex"
          height="40px"
          width="110px"
          color="gray.500"
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
