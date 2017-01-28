import React from 'react';
import { Button } from 'semantic-ui-react';

import styles from './ProfessorView.scss';
import AceEditor from '../AceEditor/AceEditor';
import IO from 'socket.io-client';

export default class ProfessorView extends React.Component {

  constructor(props) {
    super(props);
    this.socket = IO();
    this.state = {
      code: "\/\/stuff"
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(a, b) {
    this.setState({code: b.getValue()});
    this.socket.emit("PROFESSOR_CODE_EDITED", { text: b.getValue() });
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
