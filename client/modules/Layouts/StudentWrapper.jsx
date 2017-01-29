import React from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router';

import LectureLayout from './LectureLayout';
import StudentStream from '../Stream/StudentStream';

import StudentEditor from '../StudentEditor/StudentEditor';

export default class StudentWrapper extends React.Component {

  componentWillMount() {
    $.get('/api/req', (resp) => {
      if (!resp.isAuthenticated && resp.type !== 'student') {
        browserHistory.push('/');
      }
    });
  }

  render() {
    return (
      <LectureLayout videoStream={<StudentStream />} codePad={<StudentEditor />} />
    );
  }
}
