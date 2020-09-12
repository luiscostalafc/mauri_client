import React from 'react'
import { Button, ButtonGroup, Flex } from '@chakra-ui/core'

import { FaCartArrowDown } from 'react-icons/fa'

const LeftMenu: React.FC = () => {
  return (
    <Flex>
      <ButtonGroup spacing={4}>
        <Button
          size="sm"
          leftIcon={FaCartArrowDown}
          variantColor="green"
          variant="solid"
        >
          Garantia
        </Button>
        <Button
          size="sm"
          leftIcon={FaCartArrowDown}
          variantColor="yellow"
          variant="solid"
          marginLeft={-3}
        >
          Devolução
        </Button>
        <Button
          size="sm"
          leftIcon={FaCartArrowDown}
          variantColor="blue"
          variant="solid"
          marginLeft={-3}
        >
          Marca
        </Button>
      </ButtonGroup>
    </Flex>
  )
}

export default LeftMenu
