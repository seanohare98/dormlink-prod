import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import FaceIcon from '@material-ui/icons/Face';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { UserContext } from '../contexts/UserProvider';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import SaveIcon from '@material-ui/icons/Save';
import Redirect from 'react-router-dom/es/Redirect';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
  UPDATE_USER,
  USER_HOBBIES,
  ADD_USER_HOBBY,
  REMOVE_USER_HOBBY,
  DELETE_USER
} from '../utils/gqlQueries';
import { useMutation, useQuery } from '@apollo/react-hooks';
import useFormFields from '../hooks/useFormFields';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Slider from '@material-ui/core/Slider';
import { dorms, hobbies, majors } from '../utils/constants';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: '#e1e3dd',
    margin: 'auto'
  },
  title: {
    textAlign: 'center'
  },
  text: {
    margin: theme.spacing(3),
    marginBottom: theme.spacing(1),
    minWidth: '80%'
  },
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
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  }
}));

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

const Profile = () => {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);
  const { loading, error, data, refetch } = useQuery(USER_HOBBIES);
  const [deleteUser] = useMutation(DELETE_USER);
  const [UpdateUser] = useMutation(UPDATE_USER);
  const [UpdateUserHobby] = useMutation(ADD_USER_HOBBY);
  const [RemoveUserHobby] = useMutation(REMOVE_USER_HOBBY);
  const [isEditing, setEditing] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [fieldsFilled, updateFields] = useFormFields(user);

  if (!user.isComplete) return <Redirect to='/register' />;

  const deleteAccount = () => {
    if (confirm('Are you sure you want to permanently delete your account?')) {
      deleteUser({ variables: { email: user.email } });
      setUser({});
      setRedirect(true);
    }
  };

  /* fix this at once... */
  /* just add an additional resolver to set many-to-many values */
  const handleSubmit = () => {
    UpdateUser({
      variables: {
        email: user.email,
        dorm: fieldsFilled.dorm,
        age: fieldsFilled.age,
        gender: fieldsFilled.gender,
        classStanding: fieldsFilled.classStanding,
        sleepStart: fieldsFilled.sleepStart,
        sleepEnd: fieldsFilled.sleepEnd,
        cleanliness: fieldsFilled.cleanliness,
        major: fieldsFilled.major
      }
    })
      .then(() => {
        if (data) {
          data.user.hobbies.forEach(obj => {
            RemoveUserHobby({ variables: { hobby: obj.name } });
          });
        }
        fieldsFilled.hobbies.forEach(hobbyName => {
          UpdateUserHobby({
            variables: {
              hobby: hobbyName
            }
          });
        });
      })
      .then(async () => {
        await refetch(); // doesn't work, probably need to update package
        setEditing(false);
      });
  };

  if (redirect === true) return <Redirect to='/auth/logout' />;

  return (
    <div>
      <Typography variant='h6' classes={{ root: classes.title }}>
        Your Profile Summary
      </Typography>
      <div>
        <List classes={{ root: classes.demo }} dense>
          <ListItem>
            <TextField
              classes={{ root: classes.text }}
              disabled
              label='Name'
              value={`${fieldsFilled.firstName} ${fieldsFilled.lastName}`}
              margin='normal'
              variant='filled'
            />
          </ListItem>
          <ListItem>
            <TextField
              classes={{ root: classes.text }}
              disabled
              label='Email'
              value={fieldsFilled.email}
              margin='normal'
              variant='filled'
            />
          </ListItem>
          <ListItem>
            <FormControl
              component='fieldset'
              classes={{ root: classes.formControl }}
            >
              <FormLabel
                component='legend'
                classes={{ root: classes.formLabel }}
              >
                Gender
              </FormLabel>
              <Select
                name='gender'
                disabled={!isEditing}
                classes={{ root: classes.select }}
                value={fieldsFilled.gender}
                onChange={updateFields}
              >
                <MenuItem value='female'>Female</MenuItem>
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='other'>Other</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl
              component='fieldset'
              classes={{ root: classes.formControl }}
            >
              <FormLabel
                component='legend'
                classes={{ root: classes.formLabel }}
              >
                Age
              </FormLabel>
              <Select
                name='age'
                disabled={!isEditing}
                classes={{ root: classes.select }}
                value={fieldsFilled.age}
                onChange={updateFields}
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
          </ListItem>
          <ListItem>
            <FormControl
              component='fieldset'
              classes={{ root: classes.formControl }}
            >
              <FormLabel
                component='legend'
                classes={{ root: classes.formLabel }}
              >
                Class Standing
              </FormLabel>
              <Select
                disabled={!isEditing}
                name='classStanding'
                classes={{ root: classes.select }}
                value={fieldsFilled.classStanding}
                onChange={updateFields}
              >
                <MenuItem value='freshman'>Freshman</MenuItem>
                <MenuItem value='sophomore'>Sophomore</MenuItem>
                <MenuItem value='junior'>Junior</MenuItem>
                <MenuItem value='senior'>Senior</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl
              component='fieldset'
              classes={{ root: classes.formControlText }}
            >
              <FormLabel
                component='legend'
                classes={{ root: classes.formLabel }}
              >
                Dorm
              </FormLabel>
              <Autocomplete
                classes={{ root: classes.autoComplete }}
                disabled={!isEditing}
                autoComplete
                options={dorms.sort((a, b) =>
                  a.name.attr > b.name.attr ? 1 : -1
                )}
                groupBy={option => option.neighborhood}
                getOptionLabel={option => option.name}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={fieldsFilled.dormName}
                    variant='outlined'
                  />
                )}
                onChange={(event, text) => {
                  if (text) {
                    const obj = { target: { name: 'dorm', value: text.name } };
                    updateFields(obj);
                  }
                }}
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl
              component='fieldset'
              classes={{ root: classes.formControlText }}
            >
              <FormLabel
                component='legend'
                classes={{ root: classes.formLabel }}
              >
                Major
              </FormLabel>
              <Autocomplete
                disabled={!isEditing}
                classes={{ root: classes.autoComplete }}
                autoComplete
                options={majors.sort((a, b) =>
                  a.name.attr > b.name.attr ? 1 : -1
                )}
                groupBy={option => option.college}
                getOptionLabel={option => option.name}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={fieldsFilled.major}
                    variant='outlined'
                  />
                )}
                onChange={(event, text) => {
                  if (text) {
                    const obj = { target: { name: 'major', value: text.name } };
                    updateFields(obj);
                  }
                }}
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl
              component='fieldset'
              classes={{ root: classes.formControl }}
            >
              <FormLabel
                component='legend'
                classes={{ root: classes.formLabel }}
              >
                How much does cleanliness matter to you?
              </FormLabel>
              <Slider
                disabled={!isEditing}
                defaultValue={fieldsFilled.cleanliness}
                onChangeCommitted={(event, num) => {
                  const obj = { target: { name: 'cleanliness', value: num } };
                  updateFields(obj);
                }}
                getAriaValueText={valuetext}
                step={25}
                valueLabelDisplay='off'
                marks={levels}
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl
              component='fieldset'
              classes={{ root: classes.formControl }}
            >
              <FormLabel
                component='legend'
                classes={{ root: classes.formLabel }}
              >
                What time range do you usually sleep?
              </FormLabel>
              <Slider
                disabled={!isEditing}
                defaultValue={[fieldsFilled.sleepStart, fieldsFilled.sleepEnd]}
                onChangeCommitted={(event, num) => {
                  const objStart = {
                    target: { name: 'sleepStart', value: num[0] }
                  };
                  updateFields(objStart);
                  const objEnd = {
                    target: { name: 'sleepEnd', value: num[1] }
                  };
                  updateFields(objEnd);
                }}
                getAriaValueText={valuetext}
                valueLabelDisplay='off'
                aria-labelledby='range-slider'
                step={10}
                marks={times}
              />
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl
              component='fieldset'
              classes={{ root: classes.formControl }}
            >
              <FormLabel
                component='legend'
                classes={{ root: classes.formLabel }}
              >
                What are your hobbies?
              </FormLabel>
              <Select
                disabled={!isEditing}
                multiple
                value={fieldsFilled.hobbies}
                input={<Input id='select-multiple-chip' />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                onChange={(event, num) => {
                  const obj = {
                    target: { name: 'hobbies', value: event.target.value }
                  };
                  updateFields(obj);
                }}
              >
                {hobbies.map(obj => (
                  <MenuItem key={obj.label} value={obj.value}>
                    {obj.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ListItem>
          <ListItem style={{ margin: 'auto' }}>
            <Button
              color='primary'
              onClick={() => {
                setEditing(true);
              }}
            >
              <EditIcon />
              Edit Account
            </Button>
            {isEditing && (
              <Button
                color='primary'
                startIcon={<SaveIcon />}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Save Changes
              </Button>
            )}
          </ListItem>
          <ListItem style={{ margin: 'auto' }}>
            <Button onClick={deleteAccount} color='secondary'>
              <DeleteIcon />
              Delete Account
            </Button>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default Profile;
