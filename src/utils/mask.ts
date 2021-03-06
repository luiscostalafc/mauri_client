/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const cpf = (cpf: string) => {
  return cpf
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

export const cnpj = (cnpj: string) => {
  return cnpj
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const phoneNumber = (phone: string) => {
  return phone
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1');
};

export const cep = (cep: string) => {
  return cep
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1.$2')
    .replace(/(-\d{3})\d+?$/, '$1');
};

export const rg = (rg: string) => {
  return rg
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4');
};
