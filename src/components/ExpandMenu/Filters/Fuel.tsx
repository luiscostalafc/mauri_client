/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Select } from '@material-ui/core';
import React from 'react';
import { MdArrowDropDown } from 'react-icons/md';

type Options = {
  value: string | number | readonly string[] | undefined;
  label: string;
};

export default function Fuel(props: any) {
  const fuel: Options[] = [
    {
      label: 'selecione',
      value: 0,
    },
    { value: 'alcool', label: 'Álcool' },
    { value: 'gasolina', label: 'Gasolina' },
  ];
  return (
    <Select
      _hover={{ bg: '#EDF2F7' }}
      placeholder="Combust."
      name="fuel"
      icon={MdArrowDropDown}
      iconSize={8}
      backgroundImage="gray.600"
      display="flex"
      height="40px"
      width="122px"
      color="primary"
      alignItems="center"
      justifyContent="center"
      variant="standard"
      defaultValue={0}
      onChange={props.onChange}
      {...props}
    >
      {fuel.length &&
        fuel.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
    </Select>
  );
}
