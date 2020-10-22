import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ProductItem from './ProductItem';
import ProductLoading from './loading';

import { Flex } from '@chakra-ui/core'

import { get } from '../../services/api'

interface ImageProduct {
  asset?: string
  mine?: string
  path?: string
}

interface ProductItemProps {
  id?: number
  group?: string
  group_id?: number
  subgroup?: string
  name?: string
  automaker?: string //montadora
  model?: string //modelo
  year_start?: string //ano-fab
  year_end?: string // ano-mod
  engine?: string // motor
  type?: string //combust.
  complement?: string //chassi
  obs?: string //descrição
  formattedPrice?: number //valor
  image?: ImageProduct[]
}


export default function ProductContent ( ) {
  const router = useRouter();
  const queryParams = router.query;
  const { data, error, mutate, isValidating } = useSWR('products', get)

  console.log(data)


  useEffect(() => {
    mutate();
  },[queryParams])

  if (error) return <div>Failed to load products</div>
  if (!data) return <ProductLoading />

  return (
    <>

    {isValidating &&
    <ProductLoading />
    }

    {!isValidating &&

      <Flex flexDir="row" alignItems="flex-center" maxWidth="100vh" wrap="wrap">
        {data.map((item: ProductItemProps )=>(
          <ProductItem
            group={item.group}
            name={item.name}
            obs={item.obs}
          />
        ))}
      </Flex>

    }

</>

  )
}
