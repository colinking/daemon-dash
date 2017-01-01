import React from 'react';
import { Route } from 'react-router';

import Paragraph from './modules/Paragraph';

export default (
  <Route path="/" component={Paragraph}>
    <Route path="*" component={Paragraph} />
  </Route>
);
