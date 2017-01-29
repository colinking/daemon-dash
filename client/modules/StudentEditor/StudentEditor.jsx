import React from 'react';
import { Button, Label } from 'semantic-ui-react';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import IO from 'socket.io-client';

import styles from './StudentEditor.scss';
import AceEditor from '../AceEditor/AceEditor';

const LIVE = 'This code is from live.';
const BRANCH = 'This code is locally modified.';

export default class StudentEditor extends React.Component {

  constructor(props) {
    super(props);
    this.socket = IO();
    this.state = {
      code: '//stufffff',
      status: LIVE,
    };

    // This is a flag to check if change is being triggered by socket event or
    // user edit
    this.updatingText = false;

    this.studentEditedCode = this.studentEditedCode.bind(this);
    this.goToLive = this.goToLive.bind(this);
    this.updateText = (c) => {
      this.updatingText = true;
      if (this.editor) { this.editor.setText(c.text); }
      this.updatingText = false;
    };
    this.getCode = this.getCode.bind(this);
  }

  componentWillMount() {
    this.socket.on('PROFESSOR_CODE_EDITED', this.updateText);
    this.socket.on('RECIEVE_LATEST_CHANGE', (cl) => {
      this.updateText(cl);
      this.setState({ status: LIVE });
    });

    $.get('/api/req', (resp) => {
      if (!resp.isAuthenticated && resp.type !== 'professor') {
        browserHistory.push('/');
      }
    });
  }

  getCode() {
    return this.editor.getText();
  }

  studentEditedCode() {
    if (!this.updatingText) {
      this.socket.off('PROFESSOR_CODE_EDITED', this.updateText);
      this.setState({ status: BRANCH });
    }
  }

  goToLive() {
    this.socket.on('PROFESSOR_CODE_EDITED', this.updateText);
    this.socket.emit("REQUEST_LATEST_CHANGE");
  }

  render() {
    return (
      <div className={styles.app}>
        <AceEditor
          code={this.state.code}
          onChange={this.studentEditedCode}
          ref={(r) => { this.editor = r; }}
        />
        <div>
          <Label>{this.state.status}</Label>
          <Button
            disabled={this.state.status === LIVE}
            compact onClick={this.goToLive}
          >Go To Live</Button>
        </div>
      </div>
    );
  }
}
