import React from 'react'
import { Box, Flex, Text, Button } from '@chakra-ui/core'
import Logo from './Logo'

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
)

const Header = (props) => {
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

  return (
    <Flex
      as="nav"
      width={{ sm: 'full', md: 1260 }}
      align="center"
      justify="flex-start"
      wrap="wrap"
      padding="1.5rem"
      bg="gray.500"
      color="white"
      {...props}
    >
      <Box alignContent="center" paddingRight={1090}>
        <Logo />
      </Box>
      <Box display={{ sm: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'none' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
        flex-wrap="wrap"
      >
        <MenuItems>Garantia</MenuItems>
        <MenuItems>Devolução</MenuItems>
        <MenuItems>Sobre a Marca</MenuItems>
        <MenuItems>Orçamento</MenuItems>
        <MenuItems>Compras</MenuItems>
        <MenuItems>Vendas</MenuItems>
        <MenuItems>Rastrear</MenuItems>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        <Button bg="transparent" border="1px">
          Perfil
        </Button>
      </Box>
    </Flex>
  )
}

export default Header