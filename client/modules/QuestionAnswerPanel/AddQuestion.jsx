import React from 'react';
import { Button, Input, Card } from 'semantic-ui-react';
import io from 'socket.io-client';

import styles from './AddQuestion.scss';

export default class AddQuestion extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.socket = io();
    this.input = '';
  }

  handleSubmit() {
    this.socket.emit('qa add', this.state.input);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  render() {
    return (
      <Card centered className={styles.questionForm}>
        <Input placeholder='ask a question' onChange={this.handleChange}/>
        <Button onClick={this.handleSubmit} >Submit</Button>
      </Card>
    );
  }
}
