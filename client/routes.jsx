import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Paragraph from './modules/Paragraph/Paragraph';
import NotFoundPage from './modules/NotFoundPage';
import Layout from './modules/Layout';
import LectureLayout from './modules/Layouts/LectureLayout';
import StudentStream from './modules/Stream/StudentStream';
import TeacherStream from './modules/Stream/TeacherStream';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Paragraph} />
    <Route path="stream" component={LectureLayout}>
      <Route path="student" component={StudentStream} />
      <Route path="teacher" component={TeacherStream} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
