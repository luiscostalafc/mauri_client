/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Button, Text } from '@chakra-ui/core';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { Col, Container, Row } from 'react-grid-system';

interface BoxLoginInterface {
  route: string;
  title: string;
  subtitile: string;
  buttonLabel: string;
  color: string;
}

export default function BoxLogin({
  route,
  color,
  title,
  subtitile,
  buttonLabel,
}: BoxLoginInterface): ReactElement<any, any> | null {
  return (
    <Link href={route}>
      <Container style={{'border':`10px solid ${color}`, borderRadius: '10px', height: '100%', padding: '0px 50px 50px 50px'}}>
        <Row >
        <Col xs={4} offset={{ md: 4 }}>
          <Avatar size="lg" bg={color} />
        </Col>
        <Col xs={12} style={{ paddingTop: '50px'}}>
          <Text fontSize="25px">{title}</Text>      
        </Col>
        <Col xs={12} style={{ paddingBottom: '20px'}}>
          <Text fontSize="20px">{subtitile}</Text>
        </Col>
        <Col xs={12} style={{padding: '10px'}}>
          <Button color="white" size="lg" background={color} padding={10}>
            {buttonLabel}
          </Button>
        </Col>
        </Row>
      </Container>
      {/* <Box
        as="button"
        borderRadius="lg"
        w="50%"
        height="100%"
        borderWidth="1px"
      >
        <Box w="100%" height="30px" bg={color}>
        </Box>
        <Box w="100%" padding={50}>
        </Box>
      </Box> */}
    </Link>
  );
}
