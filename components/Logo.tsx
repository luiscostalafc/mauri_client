import React from 'react'
import { Image, Flex } from '@chakra-ui/core'

const Logo = () => {
  return (
    <Flex justify="flex-start">
      <Image
        rounded="full"
        size="45px"
        src="https://bit.ly/sage-adebayo"
        alt="Liconnection"
      />
    </Flex>
  )
}

export default Logo
