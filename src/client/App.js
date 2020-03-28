import React, { useContext } from 'react';
import { Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import history from './contexts/history';
import { UserContext } from './contexts/UserProvider';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import Profile from './components/Profile';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#cccccc',
      main: '#67c97a'
    }
  }
});

export default function App() {
  const [getUser, setUser] = useContext(UserContext);

  return getUser.loading && true ? (
    <CircularProgress />
  ) : (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Route path='/' component={NavBar} />
        <PrivateRoute path='/' component={Profile} />
      </Router>
    </MuiThemeProvider>
  );
}
