/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Text } from '@chakra-ui/core';
import React from 'react';
import BoxLogin from '../components/BoxLogin/Index';

export default function Login() {
  return (
    <>
      <Box as="button" borderRadius="xs" w="100%" height="100%" padding={50}>
        <Text fontSize="50px" color="tomato">
          Login
        </Text>
      </Box>
      <BoxLogin
        route="/users/sign-in"
        color="tomato"
        title="Já tenho cadastro"
        subtitile="Informe seu e-mail e senha para se autenticar"
        buttonLabel="ACESSAR"
      />
      <BoxLogin
        route="/users/sign-up"
        color="grey"
        title="Sou novo cliente"
        subtitile="O cadastro em nossa loja é simples e rápido"
        buttonLabel="CRIAR CONTA"
      />
    </>
  );
}
