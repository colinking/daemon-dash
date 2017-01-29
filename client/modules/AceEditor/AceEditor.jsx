import React from 'react';
import ReactDOM from 'react-dom';

export default class AceEditor extends React.Component {
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
    // this.setText(this.props.code);
    this.editor.on('change', (a, b) => { if (this.props.onChange) this.props.onChange(a, b); });
  }

  setText(text) {
    this.editor.setValue(text);
  }

  render() {
    const style = { fontSize: '14px !important', border: '1px solid lightgray' };
    return (
      <div ref="root" style={style}>
        {this.props.code}
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
  readOnly: true,
};
