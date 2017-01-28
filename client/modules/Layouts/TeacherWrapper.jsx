import React from 'react';

import LectureLayout from './LectureLayout';
import TeacherStream from '../Stream/TeacherStream';

export default function TeacherWrapper() {
  return (
    <LectureLayout videoStream={<TeacherStream />} />
  );
}
