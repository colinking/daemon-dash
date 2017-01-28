import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Paragraph from './modules/Paragraph/Paragraph';
import NotFoundPage from './modules/NotFoundPage';
import Layout from './modules/Layout';
import StudentWrapper from './modules/Layouts/StudentWrapper';
import TeacherWrapper from './modules/Layouts/TeacherWrapper';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Paragraph} />
    <Route path="stream">
      <Route path="student" component={StudentWrapper} />
      <Route path="teacher" component={TeacherWrapper} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
