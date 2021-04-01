/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Box, Text } from '@chakra-ui/core';
import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import BoxLogin from '../components/BoxLogin/Index';

export default function Login() {
  return (
    <>
      <Container >
        <Row>
          <Col xs={12}>
            <Box as="button" borderRadius="xs" w="100%" height="100%" padding={50}>
              <Text fontSize="50px" color="tomato">
                Login
              </Text>
            </Box>
          </Col>
          <Col xs={12} md={6}>
            <BoxLogin
              route="/users/sign-in"
              color="tomato"
              title="Já tenho cadastro"
              subtitile="Informe seu e-mail e senha para se autenticar"
              buttonLabel="ACESSAR"
            />          
          </Col>
          <Col xs={12} md={6}>
            <BoxLogin
              route="/users/sign-up"
              color="grey"
              title="Sou novo cliente"
              subtitile="O cadastro em nossa loja é simples e rápido"
              buttonLabel="CRIAR CONTA"
            />          
          </Col>
        </Row>
      </Container>
    </>
  );
}
