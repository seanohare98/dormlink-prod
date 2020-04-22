import React, { useContext, useEffect } from 'react';
import ProfileData from '../components/SimilarUserCards';
import { UserContext } from '../contexts/UserProvider';

const Profile = () => {
  const [user, setUser] = useContext(UserContext);

  if (!user.isComplete) setUser({ ...user, isComplete: true });

  return (
    <div>
      <ProfileData />
    </div>
  );
};

export default Profile;
