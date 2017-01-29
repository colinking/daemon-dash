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
    console.log(`Setting editor mode: ${this.props.mode}`);
    this.editor.getSession().setMode(`ace/mode/${this.props.mode}`);
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

  setText(text) {
    this.editor.setValue(text, 1);
  }

  updateTheme(v, c) {
    this.editor.setTheme(`ace/theme/${c.value}`);
  }

  componentDidUpdate() {
    console.log(`Setting editor mode: ${this.props.mode}`);
    // Shh..
    const lookup = {
      java: 'java',
      c: 'c_cpp',
    };
    this.editor.getSession().setMode(`ace/mode/${lookup[this.props.mode]}`);
    console.log(this.editor.getSession().getMode());
  }

  render() {
    const nipples = (this.props.isStudent) ? (
      <EditorMenu
        getText={this.getText.bind(this)}
        updateTheme={this.updateTheme.bind(this)}
        parStatus={this.props.parStatus}
        parOnClick={this.props.parOnClick.bind(this)}
        parOptions={this.props.parOptions}
        parOnChange={this.props.parOnChange.bind(this)}
        langOnChange={this.props.langOnChange.bind(this)}
        isStudent={this.props.isStudent}
        mode={this.props.mode}
      />
    ) : (
      <EditorMenu
        getText={this.getText.bind(this)}
        updateTheme={this.updateTheme.bind(this)}
        langOnChange={this.props.langOnChange.bind(this)}
        mode={this.props.mode}
      />
    );

    return (
      <div className={styles.codePane}>
        {nipples}
        <div ref="root" className={styles.editorPane}>
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
  langOnChange: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
};

AceEditor.defaultProps = {
  mode: 'java',
  code: '//write your code here',
  readOnly: false,
};
