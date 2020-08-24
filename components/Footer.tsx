import React, { useMemo } from 'react'
import { Box, Flex, Text, useColorMode } from '@chakra-ui/core'

const Footer: React.FC = () => {
  const { colorMode } = useColorMode()

  const bg = useMemo(() => (colorMode === 'dark' ? 'gray.700' : 'white'), [
    colorMode
  ])

  return (
    <Box
      as="footer"
      zIndex={4}
      ml={[0, null, '18rem']}
      right="0"
      borderTopWidth="1px"
      height="4rem"
      bg={bg}
    >
      <Flex
        size="100%"
        px="35"
        align="center"
        justify="center"
        fontSize="sm"
        opacity={0.6}
      >
        <Text>
          Copyright © {`${new Date().getFullYear()} `}
          Liconnection
        </Text>
      </Flex>
    </Box>
  )
}

export default Footer
