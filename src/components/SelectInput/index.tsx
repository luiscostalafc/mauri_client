import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
  StylesConfig,
  Theme,
} from 'react-select';
import { useField } from '@unform/core';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

const SelectInput: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  const colourStyles: StylesConfig = {
    control: styles => ({
      ...styles,
      borderRadius: 10,
      borderColor: '#a0aec0',
      fontSize: 18,
      height: 46,
      width: 142,
    }),
    option: styels => ({
      ...styels,
      color: '#F4EDE8',
    }),
  };

  const themeProps = (theme: Theme): Theme => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#ff9000',
        neutral0: '#a0aec0',
        primary25: '#a0aec0',
        primary50: '#999591',
        neutral80: '#666360',
        neutral30: '#ff9000',
      },
    };
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref: any, value: any) => {
        ref.state.value = value;
      },
      clearValue: (ref: any) => {
        ref.state.value = null;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <ReactSelect
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      styles={colourStyles}
      theme={themeProps}
      maxMenuHeight={250}
      {...rest}
    />
  );
};

export default SelectInput;
