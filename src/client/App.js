import React, { useContext } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import history from './utils/history';
import { UserContext } from './contexts/UserProvider';
import PrivateRoute from './utils/PrivateRoute';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import Registration from './pages/RegistrationPage';
import { EditPage } from './pages/RegistrationPage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutUs';

export default function App() {
  const [user, setUser] = useContext(UserContext);

  if (user.loading) return <CircularProgress />;

  return (
    <Router history={history}>
      <Route path='/' component={NavBar} />
      <Switch>
        <Route exact path='/about' component={AboutPage} />
        {!user.isComplete && (
          <PrivateRoute exact path='/register' component={Registration} />
        )}
        <PrivateRoute exact path='/profile' component={ProfilePage} />
        <PrivateRoute exact path='/edit' component={EditPage} />
        <PrivateRoute
          exact
          path='/'
          component={HomePage}
          alternate={LandingPage}
        />
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
