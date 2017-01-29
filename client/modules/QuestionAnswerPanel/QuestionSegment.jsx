import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import io from 'socket.io-client';

export default class QuestionSegment extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.socket = io();
  }

  handleSubmit() {
    if (this.props.isStudent) {
      this.socket.emit('qa upvote', this.props.question.id);
    } else {
      this.socket.emit('qa delete', this.props.question.id);
    }
  }

  render() {
    return (
      <Card centered fluid>
        <Card.Content>
          <Card.Meta>
            {this.props.question.points}
          </Card.Meta>
          <Card.Description>
            {this.props.question.body}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button onClick={this.handleSubmit}>
            {this.props.isStudent ? 'upvote' : 'delete' }
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

QuestionSegment.PropTypes = {
  key: React.PropTypes.string,
  question: React.PropTypes.object,
  isStudent: React.PropTypes.boolean,
};
