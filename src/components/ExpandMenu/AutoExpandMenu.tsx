/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import Automakers from './Filters/Automakers';
import Chassi from './Filters/Chassi';
import Fuel from './Filters/Fuel';
import Models from './Filters/Models';
import Motors from './Filters/Motors';
import Name from './Filters/Name';
import YearFab from './Filters/YearFab';
import YearModel from './Filters/YearModel';

declare interface Params {
  name: string;
  value: string;
}

type QueryObject = { [key: string]: string };

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
  const updateQuery = ({ name, value }: Params) => {
    if (value) {
      urlParams.append(name, value);
    } else {
      urlParams.delete(name);
    }
  };

  const mountQuery = () => {
    const query: QueryObject = {};
    const params = (urlParams as unknown) as Array<string[]>;
    for (const [key, value] of params) {
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
    <Container fluid>
        <Row >
          {hasInGroup([1, 2]) && (
          <Col xs={12} md={1} lg={1}>
            <Automakers onChange={(e: any) => handleChange(e)} />
          </Col>
          )}
          <Col xs={12} md={2} lg={2}>
            <Models onChange={(e: any) => handleChange(e)} />
          </Col>
          <Col xs={12} md={1} lg={1}>
            <YearFab onChange={(e: any) => handleChange(e)} />
          </Col>

          {hasInGroup([1, 2]) && (
            <Col xs={12} md={1} lg={1}>
              <YearModel onChange={(e: any) => handleChange(e)} />
            </Col>
          )}

          {hasInGroup([1, 2]) && (
            <Col xs={12} md={1} lg={1}>
              <Motors onChange={(e: any) => handleChange(e)} />
            </Col>
          )}

          {hasInGroup([1, 2]) && (
            <Col xs={12} md={1} lg={1}>
              <Fuel onChange={(e: any) => handleChange(e)} />
            </Col>
          )}
          {hasInGroup([1, 2, 3, 4]) && (
            <Col xs={12} md={1} lg={1}>
              <Chassi onChange={(e: any) => handleChange(e)} />
            </Col>
          )}
          <Col xs={12} md={2} lg={2}>
            <Name onChange={(e: any) => handleChange(e)} />
          </Col>

          <Col xs={12} md={1} lg={1}>
            <Button
              children
              onClick={() => onSearch(filter)}
              size="md"
              leftIcon={FaSearch}
            />
          </Col>
      </Row>
      </Container>
  );
};

export default AutoExpandMenu;
