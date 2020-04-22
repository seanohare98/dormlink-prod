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
  const classes = useStyles();
  //
  // return Object.keys(user).map(key => {
  //   return <div>{user[key]}</div>;
  return (
    <div>
      <Typography variant='h6' classes={{ root: classes.title }}>
        {`${user.firstName} ${user.lastName}`}
      </Typography>
      <div>
        <List classes={{ root: classes.demo }} dense>
          {Object.keys(user).map(key => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FaceIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={key} />
              <ListItemText primary={user[key]} />
              <ListItemSecondaryAction>
                <IconButton edge='end' aria-label='delete'>
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
