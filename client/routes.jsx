import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import NotFoundPage from './modules/NotFoundPage';
import ErrorPage from './modules/ErrorPage';
import Layout from './modules/Layout';
import StudentWrapper from './modules/Layouts/StudentWrapper';
import TeacherWrapper from './modules/Layouts/TeacherWrapper';

export default (
  <Route path="/" component={Layout}>
    <IndexRedirect to="/stream/student" />
    <Route path="stream">
      <Route path="student" component={StudentWrapper} />
      <Route path="teacher" component={TeacherWrapper} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
