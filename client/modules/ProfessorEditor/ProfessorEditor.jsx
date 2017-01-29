import React from 'react';
import { Button } from 'semantic-ui-react';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import IO from 'socket.io-client';

import styles from './ProfessorEditor.scss';
import AceEditor from '../AceEditor/AceEditor';
import EditorOptions from '../EditorOptions/EditorOptions';

export default class ProfessorEditor extends React.Component {

  constructor(props) {
    super(props);
    this.socket = IO();
    this.state = {
      code: '//stuff',
    };
    this.handleChange = this.handleChange.bind(this);
    this.getCode = this.getCode.bind(this);
  }

  componentWillMount() {
    $.get('/api/req', (resp) => {
      console.log(resp);
      if (!resp.isAuthenticated && resp.type !== 'professor') {
        browserHistory.push('/');
      }
    });
  }

  getCode() {
    return this.state.code;
  }

  handleChange(a, b) {
    this.setState({ code: b.getValue() });
    this.socket.emit('PROFESSOR_CODE_EDITED', { timestamp: Date.now(), text: b.getValue() });
  }

  render() {
    return (
      <div className={styles.app}>
        <AceEditor onChange={this.handleChange} />
      </div>
    );
  }
}


        // <EditorOptions getCode={this.getCode} />
