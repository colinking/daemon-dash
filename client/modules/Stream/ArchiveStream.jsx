import React from 'react';
import $ from 'jquery';

import styles from './RecordingPage.scss';

export default class ArchiveStream extends React.Component {
  constructor(props) {
    super(props);
    this.videoURL = `/public/archives/videos/${props.lectureName}.mp4`;
  }

  render() {
    return (
      <video
        src={this.videoURL}
        className={styles.vidObject}
        height="300"
        id="remoteVideos"
        autoPlay
        controls
        onTimeUpdate={this.props.onTimeUpdate}
      />);
  }
}

ArchiveStream.propTypes = {
  lectureName: React.PropTypes.string,
  onTimeUpdate: React.PropTypes.func,
};
