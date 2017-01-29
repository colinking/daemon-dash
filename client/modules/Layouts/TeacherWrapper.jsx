import React from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router';

import LectureLayout from './LectureLayout';
import TeacherStream from '../Stream/TeacherStream';

import ProfessorEditor from '../ProfessorEditor/ProfessorEditor';

export default class TeacherWrapper extends React.Component {

  componentWillMount() {
    $.get('/api/req', (resp) => {
      console.log(resp);
      if (!resp.isAuthenticated && resp.type !== 'professor') {
        browserHistory.push('/');
      }
    });
  }

  render() {
    return (
      <LectureLayout videoStream={<TeacherStream />} codePad={<ProfessorEditor />}/>
    );
  }
}
