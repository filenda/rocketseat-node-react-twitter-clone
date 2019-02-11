import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Timeline from './pages/Timeline';

class App extends Component {
  render() {
    return (
      //  you can have browserrouter, hash (#) router, etc
      <BrowserRouter>
        {/* //  Garantees that only one route will be called per address called */}
        <Switch>
          {/* 
            the "exact" tag used bellow makes sure the "Login" component is  only called when
            there's no other thing other than the value of the "path" tag to the URL. If not present
            the other components could be called because they also contain a "/" before their route names
          */}
          <Route path="/" exact component={Login}></Route>
          <Route path="/timeline" component={Timeline}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
