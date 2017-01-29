import React from 'react';
import io from 'socket.io-client';
import { Card } from 'semantic-ui-react';

import QuestionSegment from './QuestionSegment';

import styles from './QuestionAnswerPanel.scss';

export default class QuestionAnswerPanel extends React.Component {

  deepCopy(arr) {
    let ret = [];
    arr.forEach((ele) => {
      ret.push(Object.assign({}, ele));
    });
    return ret;
  };

  constructor() {
    super();
    this.state = {
      questions: [],
    }
    this.socket = io();
    this.deepCopy = this.deepCopy.bind(this);

    this.socket.on('qa fetchall resp', (vals) => {
      this.setState({
        questions: vals,
      });
    });
    this.socket.on('qa add resp', (q) => {
      this.setState({
        questions: this.deepCopy(this.state.questions).concat(q),
      });
    });
    this.socket.on('qa upvote resp', (qid) => {
      let questions = this.deepCopy(this.state.questions);
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].id === qid) {
          questions[i].points++;
        }
      }
      this.setState({
        questions: questions,
      });
    });
    this.socket.on('qa delete resp', (qid) => {
      console.log('QA DELETE RESP');
      console.log(qid);
      let questions = this.deepCopy(this.state.questions);
      let removed = [];
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].id !== qid) {
          removed.push(questions[i]);
        }
      }
      this.setState({
        questions: removed,
      });
      console.log(this.state.questions);

    });
  }

  componentWillMount() {
    this.socket.emit('qa fetchall');
  }

  render() {
    console.log('qa panel render fxn');
    let questions = this.deepCopy(this.state.questions);
    questions.sort((a, b) => {
      return b.points - a.points;
    });
    const listItems = questions.map((question) =>
      <QuestionSegment key={question.id} question={question} isStudent={this.props.isStudent} />
    );
    return (
      <Card.Group className={styles.componentWrapper}>
        {listItems}
      </Card.Group>
    );
  }
}
