import React, { ReactNode } from 'react'
import { Button, Box, ButtonGroup } from '@chakra-ui/core'

import { AiFillCar } from 'react-icons/ai'
import { GrBike, GrBook } from 'react-icons/gr'
import { FaMotorcycle } from 'react-icons/fa'
import { GoTools } from 'react-icons/go'
import { GiScissors } from 'react-icons/gi'




const Slider = (props:any) => {
  return (
    <>
      <Box flex="1" textAlign="left">
        <ButtonGroup spacing={1}>
          <Button
            width="100%"
            height={12}
            size="lg"
            bg="#ED8936"
            leftIcon={AiFillCar}
            variant="solid"
            color="#2D3748"
            justifyContent="left"
            {...props}
          >
            Auto Peças
          </Button>
          <Button
            width="100%"
            height={12}
            marginTop={1}
            size="lg"
            bg="#48BB78"
            leftIcon={FaMotorcycle}
            variant="solid"
            color="#2D3748"
            justifyContent="left"
            {...props}
          >
            Moto Peças
          </Button>
          <Button
            width="100%"
            height={12}
            marginTop={1}
            size="lg"
            bg="#E53E3E"
            leftIcon={GrBike}
            variant="solid"
            color="#2D3748"
            justifyContent="left"
            {...props}
          >
            Bicicletas
          </Button>
          <Button
            width="100%"
            height={12}
            marginTop={1}
            size="lg"
            bg="#F6E05E"
            leftIcon={GoTools}
            variant="solid"
            color="#2D3748"
            justifyContent="left"
            {...props}
          >
            Ferramentas
          </Button>
          <Button
            width="100%"
            height={12}
            marginTop={1}
            size="lg"
            bg="#4299E1"
            leftIcon={GrBook}
            variant="solid"
            color="#2D3748"
            justifyContent="left"
            {...props}
          >
            Livraria
          </Button>
          <Button
            width="100%"
            height={12}
            marginTop={1}
            size="lg"
            bg="#B7791F"
            leftIcon={GiScissors}
            variant="solid"
            color="#2D3748"
            justifyContent="left"
            {...props}
          >
            Papelaria
          </Button>
        </ButtonGroup>
      </Box>
    </>
  )
}

export default Slider