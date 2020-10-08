import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';
import LandingPage from '../pages/LandingPage';
import RegistrationPage from '../pages/RegistrationPage';

const PrivateRoute = ({ component, alternate, ...rest }) => {
  const [user, setUser] = useContext(UserContext);
  const destination = user.email && true ? component : LandingPage;
  return <Route {...rest} component={destination} />;
};

const CompleteRoute = ({ component, alternate, ...rest }) => {
  const [user, setUser] = useContext(UserContext);
  const destination = user.isComplete && true ? component : RegistrationPage;
  return <Route {...rest} component={destination} />;
};

export { CompleteRoute, PrivateRoute };
