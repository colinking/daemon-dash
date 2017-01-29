import React from 'react';

export default class TeacherStream extends React.Component {
  componentDidMount() {
		const webrtc = new SimpleWebRTC({
			localVideoEl: 'localVideo',
			autoRequestMedia: true
		});

		webrtc.on('readyToCall', () => {
			console.log('joining room');
			webrtc.joinRoom('test room');
		});
  }

  render() {
    return (<video height="300" id="localVideo"></video>);
  }
}
