import React from 'react';
import ReactDOM from 'react-dom';

import styles from './AceEditor.scss';

import EditorMenu from './EditorMenu';

export default class AceEditor extends React.Component {

  constructor(props) {
    super(props);

    this.getTest = this.getText.bind(this);
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this.refs.root);
    this.editor = ace.edit(node);
    this.editor.setTheme('ace/theme/monokai');
    this.editor.getSession().setMode(`ace/mode/${this.props.mode || 'java'}`);
    this.editor.setShowPrintMargin(false);
    this.editor.setOptions({ minLines: 25 });
    this.editor.setOptions({ maxLines: 50 });
    this.editor.$blockScrolling = Infinity;
    this.editor.setReadOnly(this.props.readOnly);
    this.editor.setValue(this.props.code);
    this.editor.on('change', (a, b) => { if (this.props.onChange) this.props.onChange(a, b); });
  }

  getText() {
    return this.editor.getValue();
  }

  updateTheme(v, c) {
    this.editor.setTheme(`ace/theme/${c.value}`);
  }

  render() {

    return (
      <div className={styles.codePane}>
        <EditorMenu getText={this.getText.bind(this)} 
          updateTheme={this.updateTheme.bind(this)} />
        <div ref='root' className={styles.editorPane}>
          {this.props.code}
        </div>
      </div>
    );
  }
}

AceEditor.propTypes = {
  mode: React.PropTypes.string,
  code: React.PropTypes.string,
  content: React.PropTypes.string,
  onChange: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
};

AceEditor.defaultProps = {
  mode: 'java',
  code: '//write your code here',
  readOnly: false,
};
