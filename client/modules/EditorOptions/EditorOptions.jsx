import React from 'react';
// import { browserHistory } from 'react-router';
// import $ from 'jquery';
import { Button, Icon } from 'semantic-ui-react';
import IO from 'socket.io-client';

import styles from './EditorOptions.scss';

export default class EditorOptions extends React.Component {

  constructor(props) {
    super(props);
    this.socket = IO();
    this.executeCode = this.executeCode.bind(this);
    this.socket.on('CODE_EXECUTED', (resp) => {
      if (resp.err) {
        console.error(resp.err);
      } else {
        console.log(resp.output);
      }
    });
  }

  executeCode() {
    this.socket.emit('EXECUTE_CODE', {
      code: this.props.getCode(),
    });
  }

  // Three buttons
  // Style, Language, Execute
  render() {
    return (
      <div className={styles.editorOptions}>
        <Button fluid color="green" onClick={this.executeCode}>
          <Icon name="terminal" /> Execute
        </Button>
      </div>
    );
  }
}

EditorOptions.propTypes = {
  getCode: React.PropTypes.func,
};
