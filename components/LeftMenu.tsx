import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/core'

import { FaCartArrowDown } from 'react-icons/fa'

const LeftMenu: React.FC = () => {
  return (
    <ButtonGroup spacing={4}>
      <Button
        size="xs"
        leftIcon={FaCartArrowDown}
        variantColor="green"
        variant="solid"
      >
        Garantia
      </Button>
      <Button
        size="xs"
        leftIcon={FaCartArrowDown}
        variantColor="yellow"
        variant="solid"
        marginLeft={-3}
      >
        Devolução
      </Button>
      <Button
        size="xs"
        leftIcon={FaCartArrowDown}
        variantColor="blue"
        variant="solid"
        marginLeft={-3}
      >
        Marca
      </Button>
    </ButtonGroup>
  )
}

export default LeftMenu
