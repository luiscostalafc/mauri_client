import React from 'react'
import { Tabs, TabPanel, Image, TabList, Tab, TabPanels } from '@chakra-ui/core'

const Group: React.FC = () => {
  return (
    <Tabs defaultIndex={1}>
      <TabList>
        <Tab>Sub Grupo</Tab>
        <Tab>Grupo</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Image
            size="280px"
            objectFit="cover"
            src="https://i.imgur.com/wok6TAf.jpg"
          />
        </TabPanel>
        <TabPanel>
          <Image
            size="280px"
            objectFit="cover"
            src="https://i.imgur.com/9fdAFwV.jpg"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Group
