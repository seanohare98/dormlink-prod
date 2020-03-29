import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserProvider';

const Profile = () => {
  const [userData, setUserData] = useContext(UserContext);
  const data = JSON.stringify(userData);
  return <div>{data}</div>;
};

export default Profile;
