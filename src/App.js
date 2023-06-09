import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/carteira" component={ Wallet } />
        </Switch>
      </Router>
    );
  }
}

export default App;
