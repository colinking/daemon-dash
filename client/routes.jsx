import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import ProfessorView from './modules/ProfessorView/ProfessorView';
import studentView from './modules/StudentView/StudentView';
import NotFoundPage from './modules/NotFoundPage';
import ErrorPage from './modules/ErrorPage';
import Layout from './modules/Layout';
import LectureLayout from './modules/Layouts/LectureLayout';
import StudentStream from './modules/Stream/StudentStream';
import TeacherStream from './modules/Stream/TeacherStream';

export default (
  <Route path="/" component={Layout}>
    <IndexRedirect to="/professorView" />
    <Route path="/professorView" component={ProfessorView} />
    <Route path="/studentView" component={studentView} />
    <Route path="stream" component={LectureLayout}>
      <Route path="student" component={StudentStream} />
      <Route path="teacher" component={TeacherStream} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
