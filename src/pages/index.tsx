/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Avatar, Box, Button, Text } from '@chakra-ui/core';
// import { Center, Container, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export default function Login() {
  return (
    <>
      <Box as="button" borderRadius="xs" w="100%" height="100%" padding={50}>
        <Text fontSize="50px" color="tomato">
          Login
        </Text>
      </Box>

      <Link href="/users/sign-in">
        <Box
          as="button"
          borderRadius="lg"
          w="50%"
          height="100%"
          borderWidth="1px"
        >
          <Box w="100%" height="30px" bg="tomato">
            <Avatar size="lg" bg="tomato" />
          </Box>
          <Box w="100%" padding={50}>
            <Text fontSize="25px">Já tenho cadastro</Text>
            <Text fontSize="20px">
              Informe seu e-mail e senha para se autenticar
            </Text>

            <Button color="white" size="lg" background="tomato" padding={20}>
              ACESSAR
            </Button>
          </Box>
        </Box>
      </Link>

      <Link href="/users/sign-up">
        <Box
          as="button"
          borderRadius="xs"
          w="50%"
          height="100%"
          borderWidth="1px"
        >
          <Box w="100%" height="30px" bg="grey">
            <Avatar size="lg" bg="grey" />
          </Box>
          <Box w="100%" padding={50}>
            <Text fontSize="25px">Sou novo cliente</Text>
            <Text fontSize="20px">
              O cadastro em nossa loja é simples e rápido
            </Text>
            <Button color="white" size="lg" background="grey" padding={20}>
              CRIAR CONTA
            </Button>
          </Box>
        </Box>
      </Link>
    </>
  );
}
