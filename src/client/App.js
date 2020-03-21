import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path='/user'>
            <About />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Home() {
  return <h2>Home Page</h2>;
}
