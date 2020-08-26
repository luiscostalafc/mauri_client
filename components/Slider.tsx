import React from 'react'
import { Button, Box, ButtonGroup } from '@chakra-ui/core'

import { AiFillCar } from 'react-icons/ai'
import { GrBike, GrBook } from 'react-icons/gr'
import { FaMotorcycle } from 'react-icons/fa'
import { GoTools } from 'react-icons/go'
import { GiScissors } from 'react-icons/gi'

const Slider: React.FC = (props) => {
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
            onClick={props.children}
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
          >
            Papelaria
          </Button>
        </ButtonGroup>
      </Box>
    </>
  )
}

export default Slider
