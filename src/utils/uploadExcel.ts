import xlsxParser from 'xls-parser'

export const formatSheet = [
  "ID do Sistema", //'id'
  "Seguimento", // 'branch_type'
  "Montadora", // 'automaker'
  "Modelo", // 'model'
  "AnoMod.De", // 'year_start'
  "AnoMod.Até", // 'year_end'
  "Motor", //'engine'
  "Complemento", //'complement'
  "Quantidade De Uso", //'quantity_used'
  "Ebalagem de Venda", //'quantity_package'
  "Grupo", // table groups -> 'group_id'
  "SubGrupo", // table subgroups -> 'subgroup_id'
  "FotoSubGrupo", // link ??? 
  "Foto do Produto", // link ???
  "Video", // link ???
  "Descrição do Fornecedor", // ???
  "Nome do Produto", //'name'
  "Sinônimos", // table synonyms -> 'group_id'
  "Medida (mm)", // 'measure'
  "Posição", //'position'
  "Sistema", //'system'
  "Côr", //'color'
  "Material", //'material'
  "Observações", //'obs'
  "Altura (cm)", //'height'
  "Largura (cm)", //'width'
  "Comprimento (cm)", //'lenth'
  "Peso (kg)", //'weight'
  "Diâmetro Interno (mm)", //'inner_diameter'
  "Diâmetro Externo (mm)", //'external_diameter'
  "Espessura (mm)", // 'depth'
  "Fornecedor Nome Fantasia", // table users (is_provider) -> nick
  "NCM Código Fiscal", // 'ncm'
  "SKU Código Fornecedor ", // 'sku'
  "EAM Código Barras", // 'eam'
  "OEM Código Original", // 'oem'
  "MPN Código Marca", // 'mpn'
  "Marca do Produto", // 'brand'
  "Qualidade da Marca", // 'quality '
  "Embalagem de Compra", // 'purchase_packaging'
  "Estoque do Fornecedor", // !!!!
  "Venda Ultimos 3 Meses", // !!!!
  "Média Venda", // !!!!
  "Local do Produto", // 'place'
  "Unidade", // 'unity'
  "Preço Custo", // 'cost_price'
  "Preço Venda", // 'sale_price'
  "Descrição Título do Produto 60 Carateres C/Fórmula", // 'description'
  "Tipo MLB", // 'type_mlb'
  "Variações MLB", // 'variations_mlb'
  "Atribuições MLB", // 'assignments_mlb'
  "ID da Categorias MLB", // 'category_id_mlb'
  "Desativado" //'inactive'
]
export const authorizedExtensions = ['text/csv','application/vnd.oasis.opendocument.spreadsheet','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-excel']

export const sheetToJson = async (file: any) => await xlsxParser.onFileSelection(file, { showNullProperties: true, hideEmptyRows: false })
export const checkExtension = (file: { type: string }) => authorizedExtensions.includes(file.type)

export const checkFormat = (file: { [s: string]: any } | ArrayLike<any>) => {
  let isValid = true
  const sheets = Object.entries(file)
  for (const sheet of sheets) {
    const firstline = sheet[1][0] // sheet[0] is the name of sheet
    const keys = JSON.stringify(Object.keys(firstline))
    const format = JSON.stringify(formatSheet)
    if(keys !== format) {
      console.log(keys)
      isValid = false
      break
    }
  }
  return isValid
}

