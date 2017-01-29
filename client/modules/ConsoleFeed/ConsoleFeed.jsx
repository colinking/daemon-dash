import React from 'react';
import ReactDOM from 'react-dom';

import { Segment } from 'semantic-ui-react';

import IO from 'socket.io-client';

import AceEditor from '../AceEditor/AceEditor';

import styles from './ConsoleFeed.scss'

export default class ConsoleFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      feed: [
        "test1",
        "test2",
        "test3",
        "test4",
        "test5",
        "test6",
        "test7",
        "test8",
        "test9",
        "test0",
        "testa",
        "testb",
        "testc",
        "testd",
        "teste",
        "testf",
      ]
    }

    this.socket = IO();
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
  }

  render() {
    return (
      <Segment attached className={styles.segment}>
        <div ref='root' className={styles.editor}>
          {this.props.code}
        </div>
      </Segment>
    );
  }
}
