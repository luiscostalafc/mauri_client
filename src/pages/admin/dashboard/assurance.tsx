import React from 'react';
import DashboardAdminButtons from '../../../components/DashboardAdminButtons';
import DashboardAdminTable from '../../../components/DashboardAdminTable';
import Template from '../../../components/Template';
import { get } from '../../../services/api';

const moduleName = 'users';
export async function getStaticProps() {
  const response = await get(moduleName);
  return {
    props: {
      data: response,
    },
  };
}

export default function Index({ data }: any) {
  const columns = [
    { name: 'Pedido (data/hs)', selector: 'name', sortable: true },
    { name: 'Faturado (data/hs)', selector: 'username', sortable: true },
    { name: 'Nº Pedido', selector: 'activity', sortable: true },
    { name: 'Cliente', selector: 'complete_name', sortable: true },
    { name: 'Forma de Envio', selector: 'email', sortable: true },
    { name: 'Fornecedor', selector: 'rg', sortable: true },
    { name: 'SKU Código Fornecedor', selector: 'cpf_cnpj', sortable: true },
    { name: 'Marca', selector: 'nick', sortable: true },
    { name: 'MPM Código Marca', selector: 'is_provider', sortable: true },
    { name: 'Qte Vendida', selector: 'inactive', sortable: true },
    { name: 'Preço Venda', selector: 'inactive', sortable: true },
    { name: 'Preço Custo', selector: 'inactive', sortable: true },
    { name: 'Margem', selector: 'inactive', sortable: true },
    {
      name: 'Descrição título do produto',
      selector: 'inactive',
      sortable: true,
    },
  ];

  return (
    <Template
      content={(
        <>
          <DashboardAdminButtons />
          <DashboardAdminTable
            data={data}
            columns={columns}
            title="Painel Administrativo - Garantia"
          />
        </>
      )}
    />
  );
}
