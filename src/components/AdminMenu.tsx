import React, { ReactNode } from 'react'
import { Button, Box, ButtonGroup } from '@chakra-ui/core'
import Link from 'next/link'

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
          <Link href="/admin/deliveries">
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
              Deliveries
            </Button>
          </Link>
          <Link href="/admin/operations">
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
            Operations
          </Button>
          </Link>
          <Link href="/admin/orders">
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
            Orders
          </Button>
          </Link>
          <Link href="/admin/products">
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
            Products
          </Button>
          </Link>
          <Link href="/admin/stock-operations">
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
            Stock operations
          </Button>
          </Link>
          <Link href="/admin/users">
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
            Users
          </Button>
          </Link>
        </ButtonGroup>
      </Box>
    </>
  )
}

export default Slider
