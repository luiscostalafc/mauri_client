/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Flex } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Automakers from './Filters/Automakers';
import Chassi from './Filters/Chassi';
import Fuel from './Filters/Fuel';
import Models from './Filters/Models';
import Motors from './Filters/Motors';
import Name from './Filters/Name';
import YearFab from './Filters/YearFab';
import YearModel from './Filters/YearModel';

const AutoExpandMenu = ({ group, onSearch, ...props }: any) => {
  const router = useRouter();
  const [selectedGroup, setGroup] = useState(1);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    setGroup(group);
  }, [group]);

  function hasInGroup(values: number[]) {
    return values.indexOf(Number(selectedGroup)) !== -1;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const updateQuery = ({ name, value }) => {
    if (value) {
      urlParams.append(name, value);
    } else {
      urlParams.delete(name);
    }
  };

  const mountQuery = () => {
    const query = {};
    for (const [key, value] of urlParams) {
      query[key] = value;
    }
    return query;
  };

  const handleChange = (event: any) => {
    if (event?.target?.name) {
      const { name, value } = event.target;
      updateQuery({ name, value });
      const query = mountQuery();
      router.push({ pathname: router.pathname, query });
      // const auxValues: any = { ...filter };
      // const { name } = event.target;
      // auxValues[name] = event.target.value;
      // setFilter(auxValues);
    }
  };

  return (
    <Flex
      backgroundColor="transparent"
      paddingLeft={5}
      flexDirection="column"
      position="relative"
    >
      <Box
        display="fixed"
        marginLeft={220}
        flexDirection="row"
        transformOrigin="left"
        transition="0.5s"
        {...props}
      >
        {hasInGroup([1, 2]) && (
          <Automakers onChange={(e: any) => handleChange(e)} />
        )}
        <Models onChange={(e: any) => handleChange(e)} />
        <YearFab onChange={(e: any) => handleChange(e)} />

        {hasInGroup([1, 2]) && (
          <YearModel onChange={(e: any) => handleChange(e)} />
        )}

        {hasInGroup([1, 2]) && (
          <Motors onChange={(e: any) => handleChange(e)} />
        )}

        {hasInGroup([1, 2]) && <Fuel onChange={(e: any) => handleChange(e)} />}
        {hasInGroup([1, 2, 3, 4]) && (
          <Chassi onChange={(e: any) => handleChange(e)} />
        )}
        <Name onChange={(e: any) => handleChange(e)} />

        <Button
          children
          onClick={() => onSearch(filter)}
          size="md"
          leftIcon={FaSearch}
        />
      </Box>
    </Flex>
  );
};

export default AutoExpandMenu;
