import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/core'

import { FaCartArrowDown } from 'react-icons/fa'

const RightMenu: React.FC = () => {
  return (
    <ButtonGroup spacing={4}>
      <Button
        size="sm"
        leftIcon={FaCartArrowDown}
        variantColor="green"
        variant="solid"
      >
        Orçamento
      </Button>
      <Button
        size="sm"
        leftIcon={FaCartArrowDown}
        variantColor="yellow"
        variant="solid"
        marginLeft={-3}
      >
        Compras
      </Button>
      <Button
        size="sm"
        leftIcon={FaCartArrowDown}
        variantColor="blue"
        variant="solid"
        marginLeft={-3}
      >
        Vendas
      </Button>
    </ButtonGroup>
  )
}

export default RightMenu
