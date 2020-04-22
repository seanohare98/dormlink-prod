import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserProvider';

const Profile = () => {
  const [user, setUser] = useContext(UserContext);

  return Object.keys(user).map(key => {
    return <div>{user[key]}</div>;
  });
};

export default Profile;
