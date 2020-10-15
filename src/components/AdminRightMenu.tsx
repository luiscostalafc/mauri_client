import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/core'
import Link from 'next/link'

import { FaCartArrowDown } from 'react-icons/fa'

const AdminRightMenu: React.FC = (props:any) => {
  return (
    <ButtonGroup spacing={4}>
      <Link href="/admin/deliveries">
      <Button
        size="sm"
        leftIcon={FaCartArrowDown}
        variantColor="green"
        variant="solid"
        {...props}
      >
        Entregas
      </Button>
      </Link>

      <Link href="/admin/operations">
      <Button
        size="sm"
        leftIcon={FaCartArrowDown}
        variantColor="yellow"
        variant="solid"
        marginLeft={3}
        {...props}
      >
        Operações
      </Button>
      </Link>

      <Link href="/admin/orders">
      <Button
        size="sm"
        leftIcon={FaCartArrowDown}
        variantColor="blue"
        variant="solid"
        marginLeft={3}
        marginRight={5}
        {...props}
      >
        Pedidos
      </Button>
      </Link>
    </ButtonGroup>
  )
}

export default AdminRightMenu
