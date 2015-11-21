import React from 'react';
import {Router, Route} from 'react-router';
import App from './components/containers/App.js';

const routes = <Router>
  <Route path="/" component={App}/>
</Router>;

export default routes;
