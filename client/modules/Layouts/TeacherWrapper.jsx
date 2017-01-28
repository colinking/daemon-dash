import React from 'react';

import LectureLayout from './LectureLayout';
import TeacherStream from '../Stream/TeacherStream';

import ProfessorView from '../ProfessorView/ProfessorView';

export default function TeacherWrapper() {
  return (
    <LectureLayout videoStream={<TeacherStream />} codePad={<ProfessorView />}/>
  );
}
