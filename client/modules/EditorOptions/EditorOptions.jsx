import React from 'react';
// import { browserHistory } from 'react-router';
// import $ from 'jquery';
import { Button, Icon } from 'semantic-ui-react';
import io from 'socket.io-client';
import FileSaver from 'file-saver';

import {uniqueGlobalId} from '../../global'

import styles from './EditorOptions.scss';

export default class EditorOptions extends React.Component {

  constructor(props) {
    super(props);
    this.executeCode = this.executeCode.bind(this);
    this.downloadCode = this.downloadCode.bind(this);
    this.socket = io();
    this.socket.on('CODE_EXECUTED', (resp) => {
      if (resp.err) {
        console.error(resp.err);
      } else {
        console.log(resp.output);
      }
    });
  }

  downloadCode() {
    let filename = 'lecture_code.c';
    if (this.props.mode === 'java') {
      filename = 'lecture_code.java';
    }
    let blob = new Blob([this.props.getCode()], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename);
  }

  executeCode() {
    console.log(uniqueGlobalId());
    this.socket.emit('EXECUTE_CODE', {
      id: uniqueGlobalId(),
      code: this.props.getCode(),
      language: this.props.mode,
    });
  }

  // Three buttons
  // Style, Language, Execute
  render() {
    return (
      <div className={styles.editorOptions}>
        <Button onClick={this.downloadCode}> Save Code </Button>
        <Button color="green" onClick={this.executeCode}
          className={styles.execute}>
          <Icon name="terminal" /> Execute
        </Button>
      </div>
    );
  }
}

EditorOptions.propTypes = {
  getCode: React.PropTypes.func,
};
