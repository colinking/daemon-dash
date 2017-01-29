import React from 'react';
import $ from 'jquery';
import io from 'socket.io-client';
import { Button } from 'semantic-ui-react';

export default class RecordingPage extends React.Component {

  constructor() {
    super();
    this.socket = io();

    this.handleStartRecording = this.handleStartRecording.bind(this);
    this.handleStopRecording = this.handleStopRecording.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.onMediaSuccess = this.onMediaSuccess.bind(this);
  }

	onMediaSuccess(stream) {
		var video = document.createElement('video');
		const videoWidth = 320;
		const videoHeight = 240;
		video = mergeProps(video, {
			controls: true,
			muted: true,
			width: videoWidth,
			height: videoHeight,
			src: URL.createObjectURL(stream)
		});
		video.play();
    const videosContainer = $('#vid-container')[0];
		videosContainer.appendChild(video);
		videosContainer.appendChild(document.createElement('hr'));
		this.mediaRecorder = new MediaStreamRecorder(stream);
		this.mediaRecorder.stream = stream;
    //this.mediaRecorder.recorderType = MediaRecorderWrapper;
		// don't force any mimeType; use above "recorderType" instead.
		// mediaRecorder.mimeType = 'video/webm'; // video/webm or video/mp4
    //this.mediaRecorder.mimeType = 'video/mp4';
		this.mediaRecorder.videoWidth = videoWidth;
		this.mediaRecorder.videoHeight = videoHeight;
    //*
		this.mediaRecorder.ondataavailable = function(blob) {
			var a = document.createElement('a');
			a.target = '_blank';
			a.innerHTML = 'this is a video';
			a.href = URL.createObjectURL(blob);
			videosContainer.appendChild(a);
			videosContainer.appendChild(document.createElement('hr'));
		};
    //*/
    /*
		var timeInterval = document.querySelector('#time-interval').value;
		if (timeInterval) timeInterval = parseInt(timeInterval);
		else timeInterval = 5 * 1000;
		// get blob after specific time interval
		mediaRecorder.start(timeInterval);
		document.querySelector('#stop-recording').disabled = false;
		document.querySelector('#pause-recording').disabled = false;
		document.querySelector('#save-recording').disabled = false;
    */
		this.mediaRecorder.start(300000);
  }

  handleStartRecording() {
    // TODO disable start button
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    }).then(this.onMediaSuccess).catch((e) => {
      console.error('media error', e);
    });
  }

  handleStopRecording() {
    this.mediaRecorder.stop();
    this.mediaRecorder.stream.stop();
    /*
    this.disabled = true;
    mediaRecorder.stop();
    mediaRecorder.stream.stop();
    document.querySelector('#pause-recording').disabled = true;
    document.querySelector('#start-recording').disabled = false;
    */
  }

  handleSave() {
    console.log('handle save');
    this.mediaRecorder.save();
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
        <Button onClick={this.handleSave}>Save Recording</Button>
        <br />
        <br />
        <div id="vid-container"></div>
      </div>
    );
  }
}
