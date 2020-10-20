import React, {MouseEvent} from 'react'
import { Button, ButtonGroup, Flex } from '@chakra-ui/core'
import Link from 'next/link'

import { FaCartArrowDown } from 'react-icons/fa'



const AdminLeftMenu: React.FC = (props) => {
  return (
    <Flex>
      <ButtonGroup spacing={4}>
      <Link  href="/admin/products">
        <a>
        <Button
          size="sm"
          leftIcon={FaCartArrowDown}
          variantColor="green"
          variant="solid"
          {...props}
        >
          Produtos
        </Button>
        </a>
        </Link>

        <Link href="/admin/stock-operations">
          <a>
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
        </a>
        </Link>

        <Link href="/admin/users">
          <a>
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
        </a>
        </Link>
      </ButtonGroup>
    </Flex>
  )
}

export default AdminLeftMenu
