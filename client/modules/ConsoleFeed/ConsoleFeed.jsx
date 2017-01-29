import React from 'react';
import ReactDOM from 'react-dom';

import { Segment } from 'semantic-ui-react';

import io from 'socket.io-client';

import AceEditor from '../AceEditor/AceEditor';

import styles from './ConsoleFeed.scss';

import {uniqueGlobalId} from '../../global'

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
    this.socket = io();
    this.socket.on('CODE_EXECUTED_' + uniqueGlobalId(), (text) => {
      if (text.err) {
        this.editor.setValue(`${text.err.desc}\n${text.err.error}`, 1);
      } else {
        this.editor.setValue(`${text.output}\n`, 1);
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
