var webrtc = new SimpleWebRTC({
	// the id/element dom element that will hold "our" video
	localVideoEl: 'localVideo',
	// the id/element dom element that will hold remote videos
	//remoteVideosEl: 'remoteVideos',
	// immediately ask for camera access
	autoRequestMedia: true
});

webrtc.createRoom('test room');

webrtc.on('readyToCall', () => {
  console.log('joining room');
	// you can name it anything
	webrtc.joinRoom('test room');
});
