import React, { Component } from 'react';
import ReactImage from '../../public/example.png';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <img src={ReactImage} alt="react" />
      </div>
    );
  }
}
