import React from 'react'
import { Button, ButtonGroup, Flex } from '@chakra-ui/core'
import Link from 'next/link'

import { FaCartArrowDown } from 'react-icons/fa'

const AdminLeftMenu: React.FC = (props:any) => {
  return (
    <Flex>
      <ButtonGroup spacing={4}>
      <Link href="/admin/products">
        <Button
          size="sm"
          leftIcon={FaCartArrowDown}
          variantColor="green"
          variant="solid"
          {...props}
        >
          Produtos
        </Button>
        </Link>

        <Link href="/admin/stock-operations">
        <Button
          size="sm"
          leftIcon={FaCartArrowDown}
          variantColor="yellow"
          variant="solid"
          marginLeft={3}
          {...props}
        >
          Estoque
        </Button>
        </Link>

        <Link href="/admin/users">
        <Button
          size="sm"
          leftIcon={FaCartArrowDown}
          variantColor="blue"
          variant="solid"
          marginLeft={3}
          {...props}
        >
         Usuários
        </Button>
        </Link>
      </ButtonGroup>
    </Flex>
  )
}

export default AdminLeftMenu
