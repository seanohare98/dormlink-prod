import React, { useContext } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import history from './utils/history';
import { UserContext } from './contexts/UserProvider';
import PrivateRoute from './utils/PrivateRoute';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Registration from './pages/RegistrationPage';
import LandingPage from './pages/LandingPage';

export default function App() {
  const [user, setUser] = useContext(UserContext);

  if (user.loading) return <CircularProgress />;

  return (
    <Router history={history}>
      <Route path='/' component={NavBar} />
      <Switch>
        <PrivateRoute exact path='/register' component={Registration} />
        <PrivateRoute
          exact
          path='/'
          component={HomePage}
          alternate={LandingPage}
        />
      </Switch>
    </Router>
  );
}
