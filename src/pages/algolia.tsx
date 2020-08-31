import algoliasearch from 'algoliasearch/lite'
import React, { Component } from 'react'
import { Box, Heading, Image } from '@chakra-ui/core'
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure
} from 'react-instantsearch-dom'

const searchClient = algoliasearch(
  'B1G2GM9NG0',
  'aadef574be1f9252bb48d4ea09b5cfe5'
)

class App extends Component {
  render() {
    return (
      <Box className="ais-InstantSearch">
        <Heading>React InstantSearch e-commerce demo</Heading>
        <InstantSearch indexName="demo_ecommerce" searchClient={searchClient}>
          <Box className="left-panel">
            <ClearRefinements />
            <Heading>Brands</Heading>
            <RefinementList attribute="brand" />
            <Configure hitsPerPage={8} />
          </Box>
          <Box className="right-panel">
            <SearchBox />
            <Hits hitComponent={Hit} />
            <Pagination />
          </Box>
        </InstantSearch>
      </Box>
    )
  }
}

function Hit(props) {
  return (
    <Box>
      <Image src={props.hit.image} alignItems="left" alt={props.hit.name} />
      <Box className="hit-name">
        <Highlight attribute="name" hit={props.hit} />
      </Box>
      <Box className="hit-description">
        <Highlight attribute="description" hit={props.hit} />
      </Box>
      <Box className="hit-price">${props.hit.price}</Box>
    </Box>
  )
}

export default App
