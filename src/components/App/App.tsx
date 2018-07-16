import * as React from 'react';
import { Component } from 'react';
import './App.css';

import { RouteManager } from '../RouteManager/RouteManager';

class App extends Component {
  public render() {
    return (
      <div className="app__container">
        <RouteManager />
      </div>
    )
  }
}

export default App;
