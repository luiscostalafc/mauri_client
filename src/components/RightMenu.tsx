import { Button, ButtonGroup } from '@chakra-ui/core';
import React from 'react';
import { FaCartArrowDown } from 'react-icons/fa';

interface Option {
  variantColor: string
  marginLeft?: number
  label: string
}
const options: Option[] = [
  { variantColor: 'green', label: 'Orçamento'},
  { variantColor: 'yellow', marginLeft: -3, label: 'Compras'},
  { variantColor: 'blue', marginLeft: -3, label: 'Vendas'},
]

const RightMenu: React.FC = () => {
  return (
    <ButtonGroup spacing={4}>
      {options.map(({variantColor, marginLeft, label}) => (
        <Button
          size="sm"
          leftIcon={FaCartArrowDown}
          variantColor={variantColor}
          marginLeft={marginLeft ?? 0}
          variant="solid"
        >
          {label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default RightMenu;
