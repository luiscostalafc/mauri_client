import React from 'react'
import { Input, Flex, Box, Select, Button } from '@chakra-ui/core'

import { FaSearch } from 'react-icons/fa'

const AutoExpandMenu: React.FC = () => {
  return (
    <Flex flexDirection="row" position="relative">
      <Box
        display="flex"
        marginLeft={175}
        flexDirection="row"
        transform="scaleX(1)"
        transformOrigin="left"
        transition="0.5s"
      >
        <Select
          placeholder="Montad."
          display="flex"
          height="40px"
          width="120px"
          color="#b2b2b2"
          alignItems="center"
          justifyContent="center"
        ></Select>

        <Select
          placeholder="Modelo"
          display="flex"
          height="40px"
          width="115px"
          color="#b2b2b2"
          alignItems="center"
          justifyContent="center"
        ></Select>

        <Select
          placeholder="Ano-Fab"
          display="flex"
          height="40px"
          width="120px"
          color="#b2b2b2"
          alignItems="center"
          justifyContent="center"
        ></Select>

        <Select
          placeholder="Ano-Mod"
          display="flex"
          height="40px"
          width="130px"
          color="#b2b2b2"
          alignItems="center"
          justifyContent="center"
        ></Select>

        <Select
          placeholder="Motor"
          display="flex"
          height="40px"
          width="105px"
          color="#b2b2b2"
          alignItems="center"
          justifyContent="center"
        ></Select>

        <Select
          placeholder="Combust."
          display="flex"
          height="40px"
          width="130px"
          color="#b2b2b2"
          alignItems="center"
          justifyContent="center"
        ></Select>
        <Select
          placeholder="Chassi"
          display="flex"
          height="40px"
          width="110px"
          color="#b2b2b2"
          alignItems="center"
          justifyContent="center"
        ></Select>

        <Input maxW="120px" size="md" />
        <Button size="md" leftIcon={FaSearch} />
      </Box>
    </Flex>
  )
}

export default AutoExpandMenu
