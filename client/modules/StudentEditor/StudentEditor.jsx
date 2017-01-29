import React from 'react';
import { Button } from 'semantic-ui-react';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import IO from 'socket.io-client';

import styles from './StudentEditor.scss';
import AceEditor from '../AceEditor/AceEditor';

export default class StudentEditor extends React.Component {

  constructor(props) {
    super(props);
    this.socket = IO();
    this.state = {
      code: '//stuff',
    };
  }

  componentWillMount() {
    this.socket.on('PROFESSOR_CODE_EDITED', (c) => {
      this.editor.setText(c.text);
    });
    $.get('/api/req', (resp) => {
      console.log(resp);
      if (!resp.isAuthenticated && resp.type !== 'professor') {
        browserHistory.push('/');
      }
    });
  }

  render() {
    return (
      <AceEditor code={this.state.code} ref={(r) => { this.editor = r; }} />
    );
  }
}
