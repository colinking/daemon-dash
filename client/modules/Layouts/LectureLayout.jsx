import React from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import { Image, Grid, Menu, Button } from 'semantic-ui-react';

import styles from './LectureLayout.scss';

export default class LectureLayout extends React.Component {

  static logout() {
    $.post('/api/logout', (resp) => {
      if (!resp.error) {
        browserHistory.push('/');
      } else {
        console.error(resp.error);
      }
    });
  }

  render() {
    return (
      <div>
        <Menu size="large">
          <Menu.Item name="Shipit" />

          <Menu.Menu position="right">
            <Menu.Item>
              <Button primary onClick={LectureLayout.logout}>Logout</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Grid columns={2} divided>
          <Grid.Column className={styles.column}>
            <Grid.Row>
              {this.props.videoStream}
            </Grid.Row>
            <Grid.Row>
              {this.props.consoleOutput}
            </Grid.Row>
          </Grid.Column>
          <Grid.Column className={styles.column}>
            <Grid.Row className={styles.codepad}>
              {this.props.codePad}
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

LectureLayout.propTypes = {
  videoStream: React.PropTypes.element.isRequired,
  consoleOutput: React.PropTypes.element.isRequired,
  codePad: React.PropTypes.element.isRequired,
};
