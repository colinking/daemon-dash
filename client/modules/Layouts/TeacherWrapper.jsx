import React from 'react';

import LectureLayout from './LectureLayout';
import TeacherStream from '../Stream/TeacherStream';

import ProfessorEditor from '../ProfessorEditor/ProfessorEditor';

export default function TeacherWrapper() {
  return (
    <LectureLayout videoStream={<TeacherStream />} codePad={<ProfessorEditor />}/>
  );
}
