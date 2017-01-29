import React from 'react';
import { Button } from 'semantic-ui-react';
import $ from 'jquery';
import { browserHistory } from 'react-router';
import IO from 'socket.io-client';

import styles from './ProfessorView.scss';
import AceEditor from '../AceEditor/AceEditor';

export default class ProfessorView extends React.Component {

  constructor(props) {
    super(props);
    this.socket = IO();
    this.state = {
      code: '//stuff',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    $.get('/api/req', (resp) => {
      console.log(resp);
      if (!resp.isAuthenticated && resp.type !== 'professor') {
        browserHistory.push('/');
      }
    });
  }

  handleChange(a, b) {
    this.setState({ code: b.getValue() });
    this.socket.emit('PROFESSOR_CODE_EDITED', { text: b.getValue() });
  }

  render() {
    return (
      <div className={styles.app}>
        <AceEditor
          onChange={this.handleChange}
          readOnly={false}
        />
      </div>
    );
  }
}
