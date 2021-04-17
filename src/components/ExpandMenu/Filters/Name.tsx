/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { FormControl, InputLabel, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const LABEL = 'Nome'
export default function Name(props: any) {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{LABEL}</InputLabel>
        <TextField name="name" onChange={props.onChange}/>
    </FormControl> 
  )
}
