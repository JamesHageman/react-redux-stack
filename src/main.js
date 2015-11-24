import 'whatwg-fetch';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import routes from './routes.js';

const store = configureStore();

render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('react-mount')
);
