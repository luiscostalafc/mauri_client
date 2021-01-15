import { Flex, Grid, Image } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import CartHeader from '../components/CartHeader';
import AutoExpandMenu from '../components/ExpandMenu/AutoExpandMenu';
import Footer from '../components/Footer';
// import Group from '../../src/components/Group'
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import ProductContent from '../components/Product/ProductContent';
import RightMenu from '../components/RightMenu';
import Slider from '../components/Slider';

export default function Index() {
  const router = useRouter();
  // const [transform, setTransform] = useState('scaleX(0)')
  const [group, setGroup] = useState(1);

  function handleProduct(filter: any) {
    const queryParams = new URLSearchParams(filter).toString();
    router.push({ pathname: '/', query: queryParams });
  }

  function handleClick(e: number) {
    setGroup(e);
    // if (transform === 'scaleX(0)') {
    //   setTransform('scaleX(1)')
    // } else {
    //   setTransform('scaleX(0)')
    // }
  }

  return (
    <Grid
      as="main"
      height="100vh"
      width="100vh"
      templateColumns="100% 50% 100% 50%"
      templateRows="200px 80px auto 0px 80px"
      templateAreas="
    '. logo header logoR'
    '. menuL filter  menuR'
    '. slider products products'
    '. . . .'
    '. . footer .'
    "
      justifyContent="center"
      justifyItems="center"
    >
      <Flex
        gridArea="header"
        flexDir="row"
        alignItems="flex-start"
        width={{ sm: '68%', md: '100%' }}
      >
        <Header />
      </Flex>

      <Flex
        gridArea="products"
        flexDir="row"
        // paddingTop={10} // seccond line of filter
        maxWidth="100vh"
        wrap="wrap"
      >
        <ProductContent />
      </Flex>
      {/* <Flex
        maxHeight="100vh"
        gridArea="group"
        flexDir="row"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Group />
      </Flex> */}
      <Flex
        marginTop={-8}
        gridArea="menuL"
        flexDir="row"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <LeftMenu />
      </Flex>
      <Flex gridArea="logo" alignItems="flex-start" justify="center">
        <Image size="70%" src="/liconnection.svg" alt="Liconnection" />
      </Flex>
      <Flex gridArea="logoR" alignItems="flex-start" justify="center">
        <CartHeader />
      </Flex>
      <Flex
        marginTop={-8}
        gridArea="menuR"
        flexDir="row"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <RightMenu />
      </Flex>

      <Flex
        paddingTop={2}
        paddingLeft={2}
        marginTop={-12}
        gridArea="slider"
        flexDir="column"
        alignItems="flex-start"
      >
        <Slider
          onClick={(e: { target: { value: number } }) =>
            handleClick(e.target.value)}
        />
      </Flex>

      <Flex
        paddingTop={2}
        id="items"
        gridArea="filter"
        flexDirection="row"
        position="relative"
      >
        <AutoExpandMenu
          group={group}
          /* transform={transform} */ onSearch={handleProduct}
        />
      </Flex>

      <Flex gridArea="footer" flexDir="row" alignItems="flex-start">
        <Footer />
      </Flex>
    </Grid>
  );
}
