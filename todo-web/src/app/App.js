import React, { Component } from 'react';

import './App.css';
import Login from '../login/login';
import Register from '../register/register';
import Main from '../main';

class App extends Component {
  render() {
    return (
      <div className=" container App">
       <Main/>
      
      </div>
    );
  }
}

export default App;
