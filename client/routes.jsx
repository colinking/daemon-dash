import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import ProfessorView from './modules/ProfessorView/ProfessorView';
import studentView from './modules/StudentView/StudentView';
import NotFoundPage from './modules/NotFoundPage';
import ErrorPage from './modules/ErrorPage';
import Layout from './modules/Layout';
import StudentWrapper from './modules/Layouts/StudentWrapper';
import TeacherWrapper from './modules/Layouts/TeacherWrapper';

export default (
  <Route path="/" component={Layout}>
    <IndexRedirect to="/professorView" />
    <Route path="/professorView" component={ProfessorView} />
    <Route path="/studentView" component={studentView} />
    <Route path="stream">
      <Route path="student" component={StudentWrapper} />
      <Route path="teacher" component={TeacherWrapper} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
