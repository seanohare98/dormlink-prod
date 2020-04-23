import React, { useContext, useEffect } from 'react';
import ProfileData from '../components/SimilarUserCards';
import { UserContext } from '../contexts/UserProvider';
import Redirect from 'react-router-dom/es/Redirect';

const Profile = () => {
  const [user, setUser] = useContext(UserContext);

  if (!user.isComplete) return <Redirect to='/register' />;

  return (
    <div>
      <ProfileData />
    </div>
  );
};

export default Profile;
