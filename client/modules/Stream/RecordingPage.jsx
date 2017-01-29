import React from 'react';
import $ from 'jquery';
import io from 'socket.io-client';
import { Button } from 'semantic-ui-react';

export default class RecordingPage extends React.Component {

  constructor() {
    super();
    this.isRecording = false;
    this.mediaStream = null;
    this.recordAudio;
    this.recordVideo;
    this.socket = io();

    this.handleStartRecording = this.handleStartRecording.bind(this);
    this.handleStopRecording = this.handleStopRecording.bind(this);
    console.log('binding');
  }

  handleStartRecording() {
    console.log('handle start recording');
    if (this.isRecording) {
      return;
    }
    this.isRecording = true;
    navigator.getUserMedia({
      audio: true,
      video: true
    }, (stream) => {
      this.mediaStream = stream;
      this.recordAudio = RecordRTC(stream, {
        onAudioProcessStarted: () => {
          this.recordVideo.startRecording();
          this.cameraPreview = $('#camera-preview')[0];
          this.cameraPreview.src = window.URL.createObjectURL(stream);
          this.cameraPreview.play();
          this.cameraPreview.muted = true;
          this.cameraPreview.controls = false;
        }
      });
      this.recordVideo = RecordRTC(stream, {
        type: 'video'
      });
      this.recordAudio.startRecording();
    }, (error) => {
      alert(JSON.stringify(error));
    });
  }

  handleStopRecording() {
    console.log('handle stop recording');
    if (!this.isRecording) {
      return;
    }
    this.isRecording = false;

    this.recordAudio.stopRecording(() => {
      // stop video recorder
      this.recordVideo.stopRecording(() => {
        // get audio data-URL
        this.recordAudio.getDataURL((audioDataURL) => {
          // get video data-URL
          this.recordVideo.getDataURL((videoDataURL) => {
            let files = {
              audio: {
                type: this.recordAudio.getBlob().type || 'audio/wav',
                dataURL: audioDataURL
              },
              video: {
                type: this.recordVideo.getBlob().type || 'video/webm',
                dataURL: videoDataURL
              }
            };
            this.socket.emit('recorded video', files);
            if (this.mediaStream) {
              this.mediaStream.stop();
            }
          });
        });
        this.cameraPreview.src = '';
        console.log('src should be zero');
      });
    });
  }

  componentDidMount() {
    let mediaOptions = {
      audio: true,
      video: true,
    };

    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      let socket = io();
      for (var i = 0; i !== devices.length; ++i) {
        let device = devices[i];
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
    return (
      <div>
        <video height="700" id="localVideo"></video>
        <br />
        <br />
        <Button onClick={this.handleStartRecording}>Start Recording</Button>
        <Button onClick={this.handleStopRecording}>Stop Recording</Button>
        <br />
        <br />
        <video id="camera-preview"></video>
      </div>
    );
  }
}
