import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';
import LandingPage from '../pages/LandingPage';

const PrivateRoute = ({ component, ...rest }) => {
  const { sid } = useContext(UserContext)[0];
  const destination = sid && true ? component : LandingPage;
  return <Route {...rest} component={destination} />;
};

export default PrivateRoute;
