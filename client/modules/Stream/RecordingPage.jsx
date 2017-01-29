import React from 'react';
import $ from 'jquery';
import io from 'socket.io-client';

import styles from './RecordingPage.scss';

export default class RecordingPage extends React.Component {

  componentDidMount() {
    let mediaOptions = {
      audio: true,
      video: true,
    };

    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      let socket = io();
      for (var i = 0; i !== devices.length; ++i) {
        var device = devices[i];
        socket.emit('device found', device);
        if (device.kind === 'videoinput') {
          if (device.label.indexOf('back') !== -1) {
            mediaOptions.video = {
              deviceId: device.deviceId
            };
          }
        }
      }

    const webrtc = new SimpleWebRTC({
      localVideoEl: 'localVideo',
      autoRequestMedia: true,
      media: mediaOptions,
    });

    webrtc.on('readyToCall', () => {
      $.ajax({
        type: 'POST',
        url: '/nonce',
        success: (data) => {
          socket.emit('device found', 'joining room');
          webrtc.joinRoom(data.nonce);
        },
      });
    });
    });
  }

  render() {
    let style = {height: "100%", bottom: "0"};

    return (
      <video style={style} height="100" id="localVideo">
      </video>
    );
  }
}
