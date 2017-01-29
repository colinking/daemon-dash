import React from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router';

import LectureLayout from './LectureLayout';
import StudentStream from '../Stream/StudentStream';

import StudentView from '../StudentView/StudentView';

export default class StudentWrapper extends React.Component {

  componentWillMount() {
    $.get('/api/req', (resp) => {
      console.log(resp);
      if (!resp.isAuthenticated && resp.type !== 'student') {
        browserHistory.push('/');
      }
    });
  }

  render() {
    return (
      <LectureLayout videoStream={<StudentStream />} codePad={<StudentView />} />
    );
  }
}
