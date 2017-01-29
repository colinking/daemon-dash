import React from 'react';
import ReactDOM from 'react-dom';

import { Select, Grid } from 'semantic-ui-react';

import styles from './AceEditor.scss';

import EditorOptions from '../EditorOptions/EditorOptions';

export default class AceEditor extends React.Component {

  constructor(props) {
    super(props);

    this.updateTheme = this.updateTheme.bind(this);
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
    // this.setText(this.props.code);
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

  render() {
    const style = { fontSize: '14px !important', border: '1px solid lightgray' };

    const themes = [
      { value: 'chrome', text: 'Chrome' },
      { value: 'clouds', text: 'Clouds' },
      { value: 'crimson_editor', text: 'Crimson Editor' },
      { value: 'dawn', text: 'Dawn' },
      { value: 'dreamweaver', text: 'Dreamweaver' },
      { value: 'eclipse', text: 'Eclipse' },
      { value: 'github', text: 'GitHub' },
      { value: 'iplastic', text: 'IPlastic' },
      { value: 'solarized_light', text: 'Solarized Light' },
      { value: 'textmate', text: 'TextMate' },
      { value: 'tomorrow', text: 'Tomorrow' },
      { value: 'xcode', text: 'XCode' },
      { value: 'kuroir', text: 'Kuroir' },
      { value: 'katzenmilch', text: 'KatzenMilch' },
      { value: 'sqlserver', text: 'SQL Server' },
      { value: 'ambiance', text: 'Ambiance' },
      { value: 'chaos', text: 'Chaos' },
      { value: 'clouds_midnight', text: 'Clouds Midnight' },
      { value: 'cobalt', text: 'Cobalt' },
      { value: 'gruvbox', text: 'Gruvbox' },
      { value: 'idle_fingers', text: 'idle Fingers' },
      { value: 'kr_theme', text: 'krTheme' },
      { value: 'merbivore', text: 'Merbivore' },
      { value: 'merbivore_soft', text: 'Merbivore Soft' },
      { value: 'mono_industrial', text: 'Mono Industrial' },
      { value: 'monokai', text: 'Monokai' },
      { value: 'pastel_on_dark', text: 'Pastel on dark' },
      { value: 'solarized_dark', text: 'Solarized Dark' },
      { value: 'terminal', text: 'Terminal' },
      { value: 'tomorrow_night', text: 'Tomorrow Night' },
      { value: 'tomorrow_night_blue', text: 'Tomorrow Night Blue' },
      { value: 'tomorrow_night_bright', text: 'Tomorrow Night Bright' },
      { value: 'tomorrow_night_eighties', text: 'Tomorrow Night 80s' },
      { value: 'twilight', text: 'Twilight' },
      { value: 'vibrant_ink', text: 'Vibrant Ink' },
    ];

    return (
      <div className={styles.codePane}>
        <div ref='root' className={styles.editorPane}>
          {this.props.code}
        </div>
        <Grid columns={2} className={styles.editorMenu}>
          <Grid.Column className={styles.embedMenu}>
            <Grid.Row>
              <Select
                compact
                defaultValue="monokai"
                placeholder="Select a theme..."
                options={themes}
                onChange={this.updateTheme}
                direction='upward'
              />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column className={styles.embedMenu}>
            <Grid.Row>
              <EditorOptions getCode={this.getText}/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
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
