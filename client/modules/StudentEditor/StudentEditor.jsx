import React from 'react';
import { Button, Label, Select } from 'semantic-ui-react';
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
      options: [{ text: 'Live', value: 'live' }],
    };

    // This is a flag to check if change is being triggered by socket event or
    // user edit
    this.updatingText = false;
    this.revisions = {};

    this.studentEditedCode = this.studentEditedCode.bind(this);
    this.reloadPastRevision = this.reloadPastRevision.bind(this);
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
    const x = Date.now();
    this.revisions[x] = this.getCode();
    this.state.options.push({ text: x, value: x });
    this.setState({ options: this.state.options });
    this.socket.on('PROFESSOR_CODE_EDITED', this.updateText);
    this.socket.emit('REQUEST_LATEST_CHANGE');
  }

  reloadPastRevision(v, d) {
    if (d.value === 'live') {
      this.socket.emit('REQUEST_LATEST_CHANGE');
      this.socket.on('PROFESSOR_CODE_EDITED', this.updateText);
      this.setState({ status: LIVE });
    } else {
      this.socket.off('PROFESSOR_CODE_EDITED', this.updateText);
      this.updateText({ text: this.revisions[d.value] });
      this.setState({ status: BRANCH });
    }
  }

  render() {
    return (
      <div className={styles.app}>
        <AceEditor
          code={this.state.code}
          onChange={this.studentEditedCode}

          parStatus={this.state.status}
          parOnClick={this.goToLive.bind(this)}
          parOptions={this.state.options}
          parOnChange={this.reloadPastRevision.bind(this)}
          isStudent={'yes'}

          ref={(r) => { this.editor = r; }}
        />
      </div>
    );
  }
}
