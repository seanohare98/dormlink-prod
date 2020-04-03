import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { hostelInfo as options } from '../utils/constants';

const InfoContainer = withStyles({
  root: {
    justifyContent: 'center',
    paddingTop: '5vh'
  }
})(Container);

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: '30%'
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
    marginRight: '30px'
  }
}));

export default function RadioButtonsGroup({ value, onChange }) {
  const classes = useStyles();

  return (
    <InfoContainer maxWidth='xl'>
      <FormControl component='fieldset' classes={{ root: classes.formControl }}>
        <FormLabel component='legend' classes={{ root: classes.formLabel }}>
          Gender
        </FormLabel>
        <RadioGroup row name='gender' value={value.gender} onChange={onChange}>
          <FormControlLabel
            value='female'
            control={<Radio color='primary' />}
            label='Female'
          />
          <FormControlLabel
            value='male'
            control={<Radio color='primary' />}
            label='Male'
          />
          <FormControlLabel
            value='other'
            control={<Radio color='primary' />}
            label='Other'
          />
        </RadioGroup>
      </FormControl>
      <FormControl component='fieldset' classes={{ root: classes.formControl }}>
        <FormLabel component='legend' classes={{ root: classes.formLabel }}>
          Age
        </FormLabel>
        <RadioGroup row name='age' value={value.age} onChange={onChange}>
          <FormControlLabel
            value='17'
            control={<Radio color='primary' />}
            label='17'
          />
          <FormControlLabel
            value='18'
            control={<Radio color='primary' />}
            label='18'
          />
          <FormControlLabel
            value='19'
            control={<Radio color='primary' />}
            label='19'
          />
          <FormControlLabel
            value='20'
            control={<Radio color='primary' />}
            label='20'
          />
          <FormControlLabel
            value='21'
            control={<Radio color='primary' />}
            label='21'
          />
          <FormControlLabel
            value='22'
            control={<Radio color='primary' />}
            label='22'
          />
          <FormControlLabel
            value='23'
            control={<Radio color='primary' />}
            label='23'
          />
          <FormControlLabel
            value='24'
            control={<Radio color='primary' />}
            label='24'
          />
          <FormControlLabel
            value='25'
            control={<Radio color='primary' />}
            label='25'
          />
        </RadioGroup>
      </FormControl>
      <FormControl
        component='fieldset'
        classes={{ root: classes.formControlText }}
      >
        <FormLabel component='legend' classes={{ root: classes.formLabel }}>
          Hostel
        </FormLabel>
        <Autocomplete
          autoComplete
          options={options.sort((a, b) => (a.name.attr > b.name.attr ? 1 : -1))}
          groupBy={option => option.affiliation}
          getOptionLabel={option => option.name}
          renderInput={params => (
            <TextField {...params} label='Hostels' variant='outlined' />
          )}
          onChange={(event, text) => {
            const obj = { target: { name: 'hostel', value: text.name } };
            onChange(obj);
          }}
        />
      </FormControl>
    </InfoContainer>
  );
}
