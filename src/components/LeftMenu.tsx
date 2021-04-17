import { Button, ButtonGroup, Flex } from '@chakra-ui/core';
import React from 'react';
import { FaCartArrowDown } from 'react-icons/fa';

interface Option {
  variantColor: string
  marginLeft?: number
  label: string
}
const options: Option[] = [
  { variantColor: 'green', label: 'Garantia'},
  { variantColor: 'yellow', marginLeft: -3, label: 'Devolução'},
  { variantColor: 'blue', marginLeft: -3, label: 'Marca'},
]

const LeftMenu: React.FC = () => {
  return (
    <Flex>
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
    </Flex>
  );
};

export default LeftMenu;
