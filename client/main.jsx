import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import IO from 'socket.io-client';

import './global.scss';

import routes from './routes';

const socket = IO();


socket.on('connected', (data) => {
  console.log(data); // eslint-disable-line no-console
});

ReactDOM.render((
  <Router history={browserHistory}>
    {routes}
  </Router>
), document.getElementById('app-root'));
