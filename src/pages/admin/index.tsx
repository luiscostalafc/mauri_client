import { Button, ButtonGroup } from '@chakra-ui/react'
import { TextField } from '@material-ui/core'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import Template from '../../components/Template'
import { get } from '../../services/api'


const moduleName = 'users'
export async function getStaticProps() {
  const response = await get(moduleName)
  return {
    props: {
      data: response,
    },
  }
}

export default function Index({ data }: any) {
  const [dataVal, setData] = useState(data)

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <TextField id="search" type="text" placeholder="Filtro por nome" aria-label="Search Input" value={filterText} onChange={onFilter} />
      <Button type="button" onClick={onClear}>X</Button>
    </>
  );

  function convertArrayOfObjectsToCSV(array) {
    let result;
  
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(data[0]);
  
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
  
    array.forEach(item => {
      let ctr = 0;
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter;
  
        result += item[key];
        
        ctr++;
      });
      result += lineDelimiter;
    });
  
    return result;
  }

  function downloadCSV(array) {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;
  
    const filename = 'export.csv';
  
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }
  
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
  }
  
  
  const Export = ({ onExport }) => (
    <Button onClick={e => onExport(e.target.value)}>Export</Button>
  );

  const columns = [
    { name: 'Pedido (data/hs)', selector: 'name', sortable: true, },
    { name: 'Faturado (data/hs)', selector: 'username', sortable: true, },
    { name: 'Nº Pedido', selector: 'activity', sortable: true, },
    { name: 'Cliente', selector: 'complete_name', sortable: true, },
    { name: 'Forma de Envio', selector: 'email', sortable: true, },
    { name: 'Fornecedor', selector: 'rg', sortable: true, },
    { name: 'SKU Código Fornecedor', selector: 'cpf_cnpj', sortable: true, },
    { name: 'Marca', selector: 'nick', sortable: true, },
    { name: 'MPM Código Marca', selector: 'is_provider', sortable: true, },
    { name: 'Qte Vendida', selector: 'inactive', sortable: true, },
    { name: 'Preço Venda', selector: 'inactive', sortable: true, },
    { name: 'Preço Custo', selector: 'inactive', sortable: true, },
    { name: 'Margem', selector: 'inactive', sortable: true, },
    { name: 'Descrição título do produto', selector: 'inactive', sortable: true, },
  ]

  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = dataVal.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
  }, [filterText, resetPaginationToggle])

  const actionsMemo = React.useMemo(() => (downloadCSV(data)), []);

  return (
    <Template
    content={
      <>
      <ButtonGroup variant="outline" spacing="6" >
        <Button borderRadius={5} color="white" size="lg" background="tomato" padding={20}>Preparando</Button>
        <Button borderRadius={5} color="white" size="lg" background="tomato" padding={20}>Pronto para enviar</Button>
        <Button borderRadius={5} color="white" size="lg" background="tomato" padding={20}>Em Trânsito</Button>
        <Button borderRadius={5} color="white" size="lg" background="tomato" padding={20}>Canceladas</Button>
        <Button borderRadius={5} color="white" size="lg" background="tomato" padding={20}>Concluídas</Button>
        <Button borderRadius={5} color="white" size="lg" background="tomato" padding={20}>Garantia</Button>
        <Button borderRadius={5} color="white" size="lg" background="tomato" padding={20}>Importar Pedidos</Button>
        <Button borderRadius={5} color="white" size="lg" background="tomato" padding={20} onClick={actionsMemo}>Exportar Pedidos</Button>
        <Button borderRadius={5} color="white" size="lg" background="tomato" padding={20}>Imprimir Pedido</Button>
        <Button borderRadius={5} color="white" size="lg" background="tomato" padding={20}>Formato etiqueta</Button>
      </ButtonGroup>
      <DataTable
        title="Painel Administrativo"
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} 
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        selectableRows
        persistTableHead
      />
      </>
    }
    />
  )
}
