import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles.scss';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
