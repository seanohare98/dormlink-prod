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
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const [user, setUser] = useContext(UserContext);

  if (user.loading) return <CircularProgress />;

  return (
    <Router history={history}>
      <Route path='/' component={NavBar} />
      <Switch>
        {!user.isComplete && (
          <PrivateRoute exact path='/register' component={Registration} />
        )}
        <PrivateRoute exact path='/profile' component={ProfilePage} />
        <PrivateRoute
          exact
          path='/'
          component={HomePage}
          alternate={LandingPage}
        />
        <Route
          exact
          path='/error'
          render={() => <h2>Something Went Wrong.</h2>}
        />
        <Route render={() => <h2>404 Page Not Found.</h2>} />
      </Switch>
    </Router>
  );
}
