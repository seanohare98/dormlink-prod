import React, { useContext } from 'react';
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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { UserContext } from '../contexts/UserProvider';
import Redirect from 'react-router-dom/es/Redirect';
import Button from '@material-ui/core/Button';
import { DELETE_USER } from '../utils/gqlQueries';
import { useMutation } from '@apollo/react-hooks';

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
  }
}));

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const [deleteUser] = useMutation(DELETE_USER);
  const [redirect, setRedirect] = React.useState(false);

  const classes = useStyles();
  const relevant = Object.keys(user).reduce((object, key) => {
    if (key !== 'loading' && key !== 'isComplete') {
      object[key] = user[key];
    }
    return object;
  }, {});

  if (!user.isComplete) return <Redirect to='/register' />;

  const deleteAccount = () => {
    deleteUser({ variables: { sid: user.sid } });
    setUser({});
    setRedirect(true);
  };

  if (redirect === true) return <Redirect to='/auth/logout' />;

  return (
    <div>
      <Button color='primary' href='/edit'>
        Edit Account
      </Button>
      <Button color='primary' href='/auth/logout'>
        Logout
      </Button>
      <Button onClick={deleteAccount} color='secondary'>
        Delete Account
      </Button>

      <Typography variant='h6' classes={{ root: classes.title }}>
        Your Profile Summary
      </Typography>
      <div>
        <List classes={{ root: classes.demo }} dense>
          {Object.keys(relevant).map(key => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FaceIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={key} />
              <ListItemText primary={user[key]} />
              <ListItemSecondaryAction>
                <IconButton edge='end' aria-label='delete' href='/edit'>
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Profile;