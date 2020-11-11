import React, { useContext } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Home } from '@material-ui/icons';
import history from './utils/history';
import { UserContext } from './contexts/UserProvider';
import { PrivateRoute } from './utils/PrivateRoute';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutUs';
import UserPage from './pages/UserPage';

export default function App() {
  const [user, setUser] = useContext(UserContext);

  if (user.loading) return <CircularProgress />;

  return (
    <Router history={history}>
      <Route path='/' component={NavBar} />
      <Switch>
        <Route exact path='/about' component={AboutPage} />
        <PrivateRoute exact path='/register' component={RegistrationPage} />
        <PrivateRoute exact path='/profile' component={ProfilePage} />
        <PrivateRoute exact path='/' component={HomePage} />
        <Route exact path='/user/:email' component={UserPage} />
        <Route
          exact
          path='/error'
          render={() => <h2>Error: Something Went Wrong.</h2>}
        />
        <Route render={() => <h2>404 Page Not Found.</h2>} />
      </Switch>
    </Router>
  );
}
