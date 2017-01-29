import React from 'react';
import ReactDOM from 'react-dom';

import { Select, Grid } from 'semantic-ui-react';

import styles from './AceEditor.scss';

import EditorOptions from '../EditorOptions/EditorOptions';

export default class EditorMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
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
      <Grid columns={2} className={styles.editorMenu}>
        <Grid.Column className={styles.embedMenu}>
          <Grid.Row>
            <Select
              compact
              defaultValue="monokai"
              placeholder="Select a theme..."
              options={themes}
              onChange={this.props.updateTheme}
              direction='upward'
            />
          </Grid.Row>
        </Grid.Column>
        <Grid.Column className={styles.embedMenu}>
          <Grid.Row>
            <EditorOptions getCode={this.props.getText}/>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}
