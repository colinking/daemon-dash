import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import NotFoundPage from './modules/NotFoundPage';
import LoginPage from './modules/LoginPage/LoginPage';
import Layout from './modules/Layout';
import StudentWrapper from './modules/Layouts/StudentWrapper';
import TeacherWrapper from './modules/Layouts/TeacherWrapper';
import RecordingPage from './modules/Stream/RecordingPage';

export default (
  <Route path="/" component={Layout}>
    <IndexRedirect to="/login" />
    <Route path="login" component={LoginPage} />
    <Route path="stream">
      <Route path="student" component={StudentWrapper} />
      <Route path="teacher" component={TeacherWrapper} />
      <Route path="recording" component={RecordingPage} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
