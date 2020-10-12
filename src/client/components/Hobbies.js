import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from 'react-select';
import { hobbies } from '../utils/constants';

const InfoContainer = withStyles({
  root: {
    justifyContent: 'center',
    padding: '3vh',
    backgroundColor: '#e1e3dd',
    borderRadius: '25px',
    width: '70%'
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
    },
    marginBottom: '10px'
  }
}));

const customSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'red' : 'green'
  })
};

const levels = [
  {
    value: 0,
    label: "I Don't Care"
  },
  {
    value: 25,
    label: ''
  },
  {
    value: 50,
    label: 'Somewhat'
  },
  {
    value: 75,
    label: ''
  },
  {
    value: 100,
    label: "I'm a neat freak"
  }
];

const times = [
  {
    value: 0,
    label: '8:00 PM'
  },
  {
    value: 20,
    label: '10:00 PM'
  },
  {
    value: 40,
    label: 'Midnight'
  },
  {
    value: 60,
    label: '2:00 AM'
  },
  {
    value: 80,
    label: '4:00 AM'
  },
  {
    value: 100,
    label: '6:00 AM'
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
          How much does cleanliness matter to you?
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
          What time range do you usually sleep?
        </FormLabel>
        <Slider
          defaultValue={value.sleep}
          onChangeCommitted={(event, num) => {
            const obj = { target: { name: 'sleep', value: num } };
            onChange(obj);
          }}
          getAriaValueText={valuetext}
          valueLabelDisplay='off'
          aria-labelledby='range-slider'
          step={10}
          marks={times}
        />
      </FormControl>
      <FormControl component='fieldset' classes={{ root: classes.formControl }}>
        <FormLabel component='legend' classes={{ root: classes.formLabel }}>
          What are your hobbies?
        </FormLabel>
        <Select
          defaultValue={value.hobbies}
          isMulti
          styles={customSelectStyles}
          name='hobbies'
          options={hobbies}
          className='basic-multi-select'
          classNamePrefix='select'
          onChange={(event, num) => {
            if (num.action === 'select-option') {
              const hobbyArr = value.hobbies.slice();
              hobbyArr.push(num.option.value);
              const obj = { target: { name: 'hobbies', value: hobbyArr } };
              onChange(obj);
            }
            if (num.action === 'remove-value') {
              const hobbyArr = value.hobbies.slice();
              const index = hobbyArr.indexOf(num.removedValue.value);
              hobbyArr.splice(index, 1);
              const obj = { target: { name: 'hobbies', value: hobbyArr } };
              onChange(obj);
            }
          }}
        />
      </FormControl>
    </InfoContainer>
  );
}
