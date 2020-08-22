import Head from 'next/head'

import Divider from '../components/Divider'

import {
  Grid,
  Flex,
  Heading,
  Input,
  Link,
  Button,
  Text,
  Box,
  Accordion,
  AccordionIcon,
  AccordionHeader,
  AccordionPanel,
  AccordionItem
} from '@chakra-ui/core'

export default function Home() {
  return (
    <Grid
      as="main"
      height="100vh"
      templateColumns="200px 720px 200px"
      templateRows="240px 720px 240px"
      justifyContent="center"
      justifyItems="center"
    >
      <Flex gridArea="slider" flexDir="column" alignItems="flex-start">
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <AccordionHeader>
              <Box flex="1" textAlign="left">
                Section 1 title
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Box flex="1" textAlign="left">
                Section 2 title
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </Grid>
  )
}
