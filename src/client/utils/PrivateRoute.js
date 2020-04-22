import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';
import LandingPage from '../pages/LandingPage';

const PrivateRoute = ({ component, alternate, ...rest }) => {
  const [user, setUser] = useContext(UserContext);
  const destination = user.sid && true ? component : LandingPage;
  return <Route {...rest} component={destination} />;
};

export default PrivateRoute;
