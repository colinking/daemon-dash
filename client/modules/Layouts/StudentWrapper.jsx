import React from 'react';

import LectureLayout from './LectureLayout';
import StudentStream from '../Stream/StudentStream';

export default function StudentWrapper() {
  return (
    <LectureLayout videoStream={<StudentStream />} />
  );
}
