import React from 'react';

export default class QuestionSegment extends React.Component {
  render() {
    return (
      <div>
        {JSON.stringify(this.props.question)}
      </div>
    );
  }
}

QuestionSegment.PropTypes = {
  key: React.PropTypes.string,
  question: React.PropTypes.object,
  isStudent: React.PropTypes.boolean,
};
