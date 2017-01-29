import React from 'react';
import { Button } from 'semantic-ui-react';

import styles from './StudentEditor.scss';
import AceEditor from '../AceEditor/AceEditor';
import IO from 'socket.io-client';

export default class StudentEditor extends React.Component {

  constructor(props) {
    super(props);
    this.socket = IO();
    this.state = {
      code: "\/\/stuff"
    }
  }

  componentWillMount() {
    this.socket.on("PROFESSOR_CODE_EDITED", (c) => {
      this.editor.setText(c.text);
    });
  }

  render() {

    return (
      <div className={styles.app}>
        <AceEditor code={this.state.code} ref={(r) => { this.editor = r } }/>
      </div>
    );
  }
}
