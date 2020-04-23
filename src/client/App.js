import React, { useContext } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import history from './utils/history';
import { UserContext } from './contexts/UserProvider';
import { PrivateRoute, CompleteRoute } from './utils/PrivateRoute';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import { EditPage, RegistrationPage } from './pages/RegistrationPage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutUs';
import UserPage from './pages/UserPage';
import { Home } from '@material-ui/icons';

export default function App() {
  const [user, setUser] = useContext(UserContext);

  if (user.loading) return <CircularProgress />;

  return (
    <Router history={history}>
      <Route path='/' component={NavBar} />
      <Switch>
        <Route exact path='/about' component={AboutPage} />
        {!user.isComplete && (
          <PrivateRoute exact path='/register' component={RegistrationPage} />
        )}
        <PrivateRoute exact path='/profile' component={ProfilePage} />
        <PrivateRoute exact path='/edit' component={EditPage} />
        <PrivateRoute exact path='/' component={HomePage} />
        <Route path='/user/:sid'>
          <UserPage />
        </Route>
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
