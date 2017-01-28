import React from 'react';
import $ from 'jquery';

export default class TeacherStream extends React.Component {
  componentDidMount() {
    const webrtc = new SimpleWebRTC({
      localVideoEl: 'localVideo',
      autoRequestMedia: true
    });

    webrtc.on('readyToCall', () => {
      console.log('joining room');
      $.ajax({
        type: 'POST',
        url: '/nonce',
        success: (data) => {
          webrtc.joinRoom(data.nonce);
          console.log(data.nonce);
        },
      });
    });
  }

  render() {
    return (<video height="300" id="localVideo"></video>);
  }
}
