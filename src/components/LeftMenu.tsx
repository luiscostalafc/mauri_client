import { Button, ButtonGroup, Flex, Heading, Box } from '@chakra-ui/core';
import { useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import { FaCartArrowDown } from 'react-icons/fa';

interface Option {
  variantColor: string;
  marginLeft?: number;
  label: string;
}
const options: Option[] = [
  { variantColor: 'green', label: 'Garantia' },
  { variantColor: 'yellow', label: 'Devolução' },
  { variantColor: 'blue', label: 'Marca' },
];

const LeftMenu: React.FC = () => {
  const [isLargerThan770] = useMediaQuery('(min-width:770px)');
  return (
    <>
      {isLargerThan770 ? (
        <Flex width="120%">
          <ButtonGroup spacing={4}>
            {options.map(({ variantColor, label }) => (
              <Button
                padding={{ xl: '5px' }}
                width={{ xl: '93px', lg: '85px', md: '75px', sm: '', xs: '' }}
                height={{ xl: '30px', lg: '30px', md: '30px', sm: '', xs: '' }}
                variantColor={variantColor}
                marginLeft={{ xl: '0px', lg: '', md: '-10px', sm: '', xs: '' }}
                variant="solid"
              >
                <Box
                  marginTop="3px"
                  width={{ xl: '20px', lg: '18px', md: '12px', sm: '', xs: '' }}
                  height={{
                    xl: '20px',
                    lg: '18px',
                    md: '15px',
                    sm: '',
                    xs: '',
                  }}
                  marginRight={{
                    xl: '3px',
                    lg: '2px',
                    md: '4px',
                    sm: '',
                    xs: '',
                  }}
                >
                  <FaCartArrowDown />
                </Box>

                <Heading
                  fontSize={{
                    xl: '14px',
                    lg: '12px',
                    md: '11px',
                    sm: '',
                    xs: '',
                  }}
                >
                  {label}
                </Heading>
              </Button>
            ))}
          </ButtonGroup>
        </Flex>
      ) : null}
    </>
  );
};

export default LeftMenu;
