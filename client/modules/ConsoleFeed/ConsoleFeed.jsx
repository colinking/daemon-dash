import React from 'react';
import ReactDOM from 'react-dom';

import { Segment } from 'semantic-ui-react';

import { socket } from '../globals';

import AceEditor from '../AceEditor/AceEditor';

import styles from './ConsoleFeed.scss';

export default class ConsoleFeed extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this.refs.root);
    this.editor = ace.edit(node);
    this.editor.setTheme('ace/theme/monokai');
    this.editor.setShowPrintMargin(false);
    this.editor.setOptions({ minLines: 10 });
    this.editor.setOptions({ maxLines: 20 });
    this.editor.$blockScrolling = Infinity;
    this.editor.setReadOnly(true);
    // this.editor.renderer.setShowGutter(false);

    socket.on('CODE_EXECUTED', (text) => {
      const time = new Date().toLocaleTimeString();
      const top = `${time} (Exit Code: ${text.code})\n--------------------------`;
      if (text.err) {
        this.editor.setValue(`${top}\n${text.err.desc}\n${text.err.error}`, 1);
      } else {
        this.editor.setValue(`${top}\n${text.output}\n`, 1);
      }
    });
  }

  render() {
    return (
      <Segment attached className={styles.segment}>
        <div ref="root" className={styles.editor}>
          {this.props.code}
        </div>
      </Segment>
    );
  }
}
