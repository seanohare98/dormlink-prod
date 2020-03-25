import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import UserProvider from './contexts/UserProvider';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#cccccc',
      main: '#67c97a'
    }
  }
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <UserProvider>
          <Route path='/' component={NavBar} />
          <Route path='/profile' component={Profile} />
        </UserProvider>
        <Route path='/' exact component={LandingPage} />
      </Router>
    </MuiThemeProvider>
  );
}
