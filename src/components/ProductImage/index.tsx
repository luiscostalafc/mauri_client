import React from 'react';

import { Container } from './styles';

import { Image } from '@chakra-ui/core'

interface ImageProduct {
  asset?: string
  mine?: string
  path?: string
}

const ProductImage: React.FC<ImageProduct> = () => {
  return (

    <Image


    />
  );
}

export default ProductImage;
