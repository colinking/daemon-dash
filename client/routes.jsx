import React from 'react';
import { Route, IndexRoute } from 'react-router';

import NotFoundPage from './modules/NotFoundPage';
import LoginPage from './modules/LoginPage/LoginPage';
import StudentPage from './modules/StudentPage/StudentPage';
import ProfessorPage from './modules/ProfessorPage/ProfessorPage';
import Layout from './modules/Layout';

// desiredAccess =
// [ 'none' (default) | 'any' (login) | 'student' (login|default) | 'professor' (login|default) ]
// function requireAuth(req, desiredAccess) {
//   return (nextState, replace) => {
//     if (!req.isAuthenticated) {
//       if (desiredAccess !== 'none') {
//         replace({
//           pathname: '/login',
//         });
//       }
//     } else if (desiredAccess !== req.user.type) {
//       replace({
//         pathname: (req.user.type === 'student' ? '/student' : '/professor'),
//       });
//     }
//   };
// }

export default (
  <Route path="/" component={Layout}>
    <Route path="login" component={LoginPage} />
    <Route path="student" component={StudentPage} />
    <Route path="professor" component={ProfessorPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
