import React from 'react';
import { Image, Grid, Segment } from 'semantic-ui-react';

import styles from './LectureLayout.scss';

export default function LectureLayout(props) {
  return (
    <div>
      <Segment>
        <p>TITLE HERE</p>
      </Segment>
      <Grid columns={2} divided>
        <Grid.Column className={styles.column}>
          <Grid.Row>
            {props.videoStream}
          </Grid.Row>
          <Grid.Row>
            <Image src='http://semantic-ui.com/images/wireframe/media-paragraph.png' />
            {props.consoleOutput}
          </Grid.Row>
        </Grid.Column>
        <Grid.Column className={styles.column}>
          <Grid.Row className={styles.codepad}>
            {props.codePad}
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
}

LectureLayout.propTypes = {
  videoStream: React.PropTypes.element.isRequired,
  consoleOutput: React.PropTypes.element.isRequired,
  codePad: React.PropTypes.element.isRequired,
};
