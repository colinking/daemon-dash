import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Paragraph from './modules/Paragraph/Paragraph';
import NotFoundPage from './modules/NotFoundPage';
import LoginPage from './modules/LoginPage/LoginPage';
import Layout from './modules/Layout';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Paragraph} />
    <Route path="login" component={LoginPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
