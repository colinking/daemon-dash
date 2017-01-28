import React from 'react';

export default function LectureLayout(props) {
  return (
    <div className="lecture-layout-content">{props.children}</div>
  );
}

LectureLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};
