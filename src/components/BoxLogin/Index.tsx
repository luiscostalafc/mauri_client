/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Box, Button, Text } from '@chakra-ui/core';
import Link from 'next/link';
import React, { ReactElement } from 'react';

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
      <Box
        as="button"
        borderRadius="lg"
        w="50%"
        height="100%"
        borderWidth="1px"
      >
        <Box w="100%" height="30px" bg={color}>
          <Avatar size="lg" bg={color} />
        </Box>
        <Box w="100%" padding={50}>
          <Text fontSize="25px">{title}</Text>
          <Text fontSize="20px">{subtitile}</Text>

          <Button color="white" size="lg" background={color} padding={20}>
            {buttonLabel}
          </Button>
        </Box>
      </Box>
    </Link>
  );
}
