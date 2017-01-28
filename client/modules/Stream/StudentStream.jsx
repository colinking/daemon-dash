import React from 'react';

export default class StudentStream extends React.Component {
  componentDidMount() {
		const webrtc = new SimpleWebRTC({
      remoteVideosEl: 'remoteVideos',
		});
    webrtc.joinRoom('test room');
  }

  render() {
    return (<div height="300" id="remoteVideos"></div>);
  }
}
