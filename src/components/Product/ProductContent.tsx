import { useEffect, useState, } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ProductItem from './ProductItem';
import ProductLoading from './loading';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import styles from '../../styles/pages/styles.module.css'


import { Flex, Spinner} from '@chakra-ui/core'

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

  const [currentPage, setCurrentPage] = useState(0);
  const { data, error, mutate, isValidating } = useSWR('products', get)
  const [dataProducts, setDataProducts ] = useState<ProductItemProps[]>([])


 useEffect(() => {
  async function dataProductsApi() {
    const response = await get('products')
    setDataProducts(response)
  }

  dataProductsApi()

 }, [])


  function handlePageClick({ selected: selectedPage }: any){
    setCurrentPage(selectedPage);
}

  const maxPage = 9;
  const offset = currentPage * maxPage;

    const currentPageData = dataProducts
    .slice(offset, offset + maxPage)
    .map((item: ProductItemProps) => (<ProductItem
      key={item.id}
      group={item.group}
      name={item.name}
      obs={item.obs}
    />))

  const pageCount = Math.ceil(dataProducts.length / maxPage)

  useEffect(() => {
    mutate();
  },[queryParams])

  if (error) return <div>Ocorreu algum erro ao carregar os produtos verifique sua conexão ou atualize a página</div>
  if (!data) return <ProductLoading/>

  return (
    <>

    {isValidating &&

    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="orange.300" size="xl"/>
    }

    {!isValidating &&

      <Flex flexDir="row" alignItems="flex-center" maxWidth="100vh" wrap="wrap">
        {currentPageData}

        <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        previousLinkClassName={styles.pagination__link}
        nextLinkClassName={styles.pagination__link}

      />
      </Flex>


    }

</>

  )
}
