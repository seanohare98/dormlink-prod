import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const InfoContainer = withStyles({
  root: {
    justifyContent: 'center',
    paddingTop: '5vh',
    backgroundColor: '#e1e3dd',
    borderRadius: '25px'
  }
})(Container);

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: '70%',
    marginBottom: theme.spacing(1),
    display: 'block'
  },
  formControlText: {
    width: '80%',
    margin: theme.spacing(2)
  },
  formLabel: {
    color: '#000',
    '&.Mui-focused': {
      color: '#000'
    }
  }
}));

const levels = [
  {
    value: 0,
    label: 'No way!'
  },
  {
    value: 25,
    label: ''
  },
  {
    value: 50,
    label: "Don't mind..."
  },
  {
    value: 75,
    label: ''
  },
  {
    value: 100,
    label: 'Yes please!'
  }
];

function valuetext(value) {
  return `${value}`;
}

export default function RadioButtonsGroup({ value, onChange }) {
  const classes = useStyles();

  return (
    <InfoContainer maxWidth='xl'>
      <FormControl component='fieldset' classes={{ root: classes.formControl }}>
        <FormLabel component='legend' classes={{ root: classes.formLabel }}>
          Night Owl?
        </FormLabel>
        <Slider
          defaultValue={value.schedule}
          onChangeCommitted={(event, num) => {
            const obj = { target: { name: 'schedule', value: num } };
            onChange(obj);
          }}
          getAriaValueText={valuetext}
          aria-labelledby='discrete-slider-custom'
          step={25}
          valueLabelDisplay='off'
          marks={levels}
        />
      </FormControl>
      <FormControl component='fieldset' classes={{ root: classes.formControl }}>
        <FormLabel component='legend' classes={{ root: classes.formLabel }}>
          Neat Freak?
        </FormLabel>
        <Slider
          defaultValue={value.cleanliness}
          onChangeCommitted={(event, num) => {
            const obj = { target: { name: 'cleanliness', value: num } };
            onChange(obj);
          }}
          getAriaValueText={valuetext}
          step={25}
          valueLabelDisplay='off'
          marks={levels}
        />
      </FormControl>
      <FormControl component='fieldset' classes={{ root: classes.formControl }}>
        <FormLabel component='legend' classes={{ root: classes.formLabel }}>
          Active Community Member?
        </FormLabel>
        <Slider
          defaultValue={value.participation}
          onChangeCommitted={(event, num) => {
            const obj = { target: { name: 'participation', value: num } };
            onChange(obj);
          }}
          getAriaValueText={valuetext}
          aria-labelledby='discrete-slider-custom'
          step={25}
          valueLabelDisplay='off'
          marks={levels}
        />
      </FormControl>
      <FormControl component='fieldset' classes={{ root: classes.formControl }}>
        <FormLabel component='legend' classes={{ root: classes.formLabel }}>
          Just Like You? (age, major, etc.)
        </FormLabel>
        <Slider
          defaultValue={value.similarity}
          onChangeCommitted={(event, num) => {
            const obj = { target: { name: 'similarity', value: num } };
            onChange(obj);
          }}
          getAriaValueText={valuetext}
          aria-labelledby='discrete-slider-custom'
          step={25}
          valueLabelDisplay='off'
          marks={levels}
        />
      </FormControl>
    </InfoContainer>
  );
}
