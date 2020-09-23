import React from 'react'
import { Image, Flex } from '@chakra-ui/core'

const Logo = () => {
  return (
    <Flex justify="flex-start">
      <Image
        rounded="full"
        size="100%"
        src="/liconnection.svg"
      />
    </Flex>
  )
}

export default Logo
