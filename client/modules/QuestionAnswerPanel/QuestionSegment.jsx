import React from 'react';
import { Button, Card } from 'semantic-ui-react';

export default class QuestionSegment extends React.Component {
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
          <Button>
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
