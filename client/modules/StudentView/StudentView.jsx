import React from 'react';
import { Button } from 'semantic-ui-react';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import IO from 'socket.io-client';

import styles from './StudentView.scss';
import AceEditor from '../AceEditor/AceEditor';
import EditorOptions from '../EditorOptions/EditorOptions';

export default class StudentView extends React.Component {

  constructor(props) {
    super(props);
    this.socket = IO();
    this.state = {
      code: '//stuff',
    };
    this.getCode = this.getCode.bind(this);
  }

  componentWillMount() {
    this.socket.on('PROFESSOR_CODE_EDITED', (c) => {
      this.editor.setText(c.text);
      // this.setState({ code: c.text });
    });
    $.get('/api/req', (resp) => {
      console.log(resp);
      if (!resp.isAuthenticated && resp.type !== 'professor') {
        browserHistory.push('/');
      }
    });
  }

  getCode() {
    // WTF?
    return this.editor.editor.getValue();
  }

  render() {
    console.log('render');
    return (
      <div className={styles.app}>
        <EditorOptions getCode={this.getCode} />
        <AceEditor code={this.state.code} ref={(r) => { this.editor = r; }} />
      </div>
    );
  }
}
