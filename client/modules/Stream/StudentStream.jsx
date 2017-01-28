import React from 'react';
import $ from 'jquery';

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
    return (<div height="300" id="remoteVideos"></div>);
  }
}
