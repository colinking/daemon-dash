import React from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import { Image, Grid, Button } from 'semantic-ui-react';

import styles from './LectureLayout.scss';
import MenuLayout from './MenuLayout';

export default class LectureLayout extends React.Component {

  render() {
    return (
      <div className={styles.lectureLayout}>
        <MenuLayout activeTab="home" />
        <Grid columns={2} divided className={styles.grid}>
          <Grid.Column className={styles.column1}>
            <Grid.Row className={styles.videoPane}>
              {this.props.videoStream}
            </Grid.Row>
            <Grid.Row className={styles.outputPane}>
              {this.props.consoleOutput}
            </Grid.Row>
          </Grid.Column>
          <Grid.Column className={styles.column2}>
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
