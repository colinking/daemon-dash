import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Paragraph from './modules/Paragraph/Paragraph';
import NotFoundPage from './modules/NotFoundPage';
import Layout from './modules/Layout';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Paragraph} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
