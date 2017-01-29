import React from 'react';
import { Button, Input, Card } from 'semantic-ui-react';

import styles from './AddQuestion.scss';

export default class AddQuestion extends React.Component {

  render() {
    return (
      <Card centered className={styles.questionForm}>
        <Input placeholder='ask a question' />
        <Button>Submit</Button>
      </Card>
    );
  }
}
