import React from 'react';

import LectureLayout from './LectureLayout';
import StudentStream from '../Stream/StudentStream';

import StudentView from '../StudentView/StudentView';

export default function StudentWrapper() {
  return (
    <LectureLayout videoStream={<StudentStream />} codePad={<StudentView />} />
  );
}
