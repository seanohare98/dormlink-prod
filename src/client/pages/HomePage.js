import React, { useContext, useEffect } from 'react';
import Redirect from 'react-router-dom/es/Redirect';
import { UserContext } from '../contexts/UserProvider';

const Profile = () => {
  const [user, setUser] = useContext(UserContext);

  if (user.update) return <div>loading</div>;
  if (!user.isComplete) return <Redirect to='/register' />;

  return <div>homepage for {user.email}</div>;
};

export default Profile;
