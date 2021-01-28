import { Button, ButtonGroup, Flex } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { FaCartArrowDown } from 'react-icons/fa';

const AdminLeftMenu: React.FC = props => {
  const router = useRouter();

  return (
    <Flex>
      <ButtonGroup spacing={4}>
        <Button
          size="xs"
          leftIcon={FaCartArrowDown}
          variantColor="green"
          variant="solid"
          onClick={() => {
            router.push('/admin/products');
          }}
          {...props}
        >
          Produtos
        </Button>

        <Button
          size="xs"
          leftIcon={FaCartArrowDown}
          variantColor="yellow"
          variant="solid"
          marginLeft={0.5}
          onClick={() => {
            router.push('/admin/stock-operations');
          }}
          {...props}
        >
          Estoque
        </Button>

        <Button
          size="xs"
          leftIcon={FaCartArrowDown}
          variantColor="blue"
          variant="solid"
          marginLeft={0.5}
          onClick={() => {
            router.push('/admin/users');
          }}
          {...props}
        >
          Usuários
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default AdminLeftMenu;
