import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import './main.css';

import Paragraph from './modules/Paragraph';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="*" component={Paragraph} />
  </Router>
), document.getElementById('root'));
