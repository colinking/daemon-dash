import React from 'react';
import { browserHistory } from 'react-router';

import { Header } from 'semantic-ui-react';

import styles from './ClassCard.scss';

export default class ClassCard extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    browserHistory.push(`/archives/${this.props.name}`);
  }

  render() {
    return (
      <div>
        <div className={styles.classcard} onClick={this.clickHandler}>
          <Header as="h2" textAlign="center">{this.props.start.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}</Header>
        </div>
      </div>
    );
  }
}

ClassCard.propTypes = {
  start: React.PropTypes.instanceOf(Date).isRequired,
  name: React.PropTypes.string.isRequired,
  live: React.PropTypes.bool.isRequired,
};
