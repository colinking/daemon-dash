import React from 'react';
import $ from 'jquery';

import styles from './RecordingPage.scss';

export default class StudentStream extends React.Component {
  componentDidMount() {
    const webrtc = new SimpleWebRTC({
      remoteVideosEl: 'remoteVideos',
    });
    $.ajax({
      type: 'POST',
      url: '/nonce',
      success: (data) => {
        webrtc.joinRoom(data.nonce);
        console.log(data.nonce);
      },
    });
  }

  render() {
    return (<div className={styles.vidObject} height="300" id="remoteVideos"></div>);
  }
}
