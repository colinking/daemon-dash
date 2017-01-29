import React from 'react';

import LectureLayout from './LectureLayout';
import StudentStream from '../Stream/StudentStream';

import StudentEditor from '../StudentEditor/StudentEditor';

export default function StudentWrapper() {
  return (
    <LectureLayout videoStream={<StudentStream />} codePad={<StudentEditor />} />
  );
}
