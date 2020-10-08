import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { dorms as options, majors } from '../utils/constants';

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
    marginBottom: theme.spacing(1),
    minWidth: '80%'
  },
  formControlText: {
    width: '80%',
    margin: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  formLabel: {
    color: '#000',
    '&.Mui-focused': {
      color: '#000'
    },
    marginBottom: theme.spacing(1)
  },
  select: {
    minWidth: '80%'
  },
  autoComplete: {
    minWidth: '50%',
    maxWidth: '100%'
  }
}));

export default function RadioButtonsGroup({ value, onChange, child }) {
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
          Class standing
        </FormLabel>
        <RadioGroup
          row
          name='classStanding'
          value={value.classStanding}
          onChange={onChange}
        >
          <FormControlLabel
            value='freshman'
            control={<Radio color='primary' />}
            label='Freshman'
          />
          <FormControlLabel
            value='sophomore'
            control={<Radio color='primary' />}
            label='Sophomore'
          />
          <FormControlLabel
            value='Junior'
            control={<Radio color='primary' />}
            label='Junior'
          />
          <FormControlLabel
            value='Senior'
            control={<Radio color='primary' />}
            label='Senior'
          />
        </RadioGroup>
      </FormControl>
      <FormControl component='fieldset' classes={{ root: classes.formControl }}>
        <FormLabel component='legend' classes={{ root: classes.formLabel }}>
          Age
        </FormLabel>
        <Select
          name='age'
          classes={{ root: classes.select }}
          value={value.age}
          onChange={onChange}
        >
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={17}>17</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={19}>19</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={21}>21</MenuItem>
          <MenuItem value={22}>22</MenuItem>
          <MenuItem value={23}>23</MenuItem>
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={26}>26</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        component='fieldset'
        classes={{ root: classes.formControlText }}
      >
        <FormLabel component='legend' classes={{ root: classes.formLabel }}>
          Dorm
        </FormLabel>
        <Autocomplete
          classes={{ root: classes.autoComplete }}
          autoComplete
          options={options.sort((a, b) => (a.name.attr > b.name.attr ? 1 : -1))}
          groupBy={option => option.neighborhood}
          getOptionLabel={option => option.name}
          renderInput={params => (
            <TextField {...params} label={value.dorm} variant='outlined' />
          )}
          onChange={(event, text) => {
            if (text) {
              const obj = { target: { name: 'dorm', value: text.name } };
              onChange(obj);
            }
          }}
        />
      </FormControl>
      <FormControl
        component='fieldset'
        classes={{ root: classes.formControlText }}
      >
        <FormLabel component='legend' classes={{ root: classes.formLabel }}>
          Major
        </FormLabel>
        <Autocomplete
          classes={{ root: classes.autoComplete }}
          autoComplete
          options={majors.sort((a, b) => (a.name.attr > b.name.attr ? 1 : -1))}
          groupBy={option => option.college}
          getOptionLabel={option => option.name}
          renderInput={params => (
            <TextField {...params} label={value.major} variant='outlined' />
          )}
          onChange={(event, text) => {
            if (text) {
              const obj = { target: { name: 'major', value: text.name } };
              onChange(obj);
            }
          }}
        />
      </FormControl>
      {child}
    </InfoContainer>
  );
}
