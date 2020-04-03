import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { UserProvider } from './contexts/UserProvider';
import App from './App';
import client from './contexts/GraphQLClient';
import './styles.scss';
import theme from './utils/theme';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <UserProvider>
        <App />
      </UserProvider>
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
