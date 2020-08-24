import React from 'react'

import Table from '../components/Table/Table'
import Card from '../components/Card/Card'
import { Input } from '@chakra-ui/core'

const ProductList: React.FC = () => (
  <Card>
    <Table>
      <Table.THead>
        <Table.THead.TR>
          <Table.THead.TH>Montadora</Table.THead.TH>
          <Table.THead.TH>Modelo</Table.THead.TH>
          <Table.THead.TH>Ano-Fab</Table.THead.TH>
          <Table.THead.TH>Ano-Mod</Table.THead.TH>
          <Table.THead.TH>Motor</Table.THead.TH>
          <Table.THead.TH>Combustível</Table.THead.TH>
          <Table.THead.TH>N°Chassi</Table.THead.TH>
        </Table.THead.TR>
      </Table.THead>

      <Table.TBody>
        <Table.TBody.TR>
          <Table.TBody.TD>
            <Input size="sm" />
          </Table.TBody.TD>
          <Table.TBody.TD>
            <Input size="sm" />
          </Table.TBody.TD>
          <Table.TBody.TD>
            <Input size="sm" />
          </Table.TBody.TD>
          <Table.TBody.TD>
            <Input size="sm" />
          </Table.TBody.TD>
          <Table.TBody.TD>
            <Input size="sm" />
          </Table.TBody.TD>
          <Table.TBody.TD>
            <Input size="sm" />
          </Table.TBody.TD>
          <Table.TBody.TD>
            <Input size="sm" />
          </Table.TBody.TD>
        </Table.TBody.TR>
      </Table.TBody>
    </Table>
  </Card>
)

export default ProductList
