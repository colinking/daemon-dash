import React from 'react';
import $ from 'jquery';
import { browserHistory } from 'react-router';

import LectureLayout from './LectureLayout';
import ArchiveStream from '../Stream/ArchiveStream';

import Console from '../Console/Console';

import StudentEditor from '../StudentEditor/StudentEditor';

export default class ArchiveWrapper extends React.Component {

  constructor() {
    super();
    this.state = {
      codeStream: null,
    };
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.getBestText = this.getBestText.bind(this);
  }

  componentWillMount() {
    console.log(this.getCurrentLectureName());
    $.get('/api/req', (resp) => {
      if (!resp.isAuthenticated) {
        browserHistory.push('/');
      }
    });
    const url = `/public/archives/code/${this.getCurrentLectureName()}.json`;
    console.log(`Downloading: ${url}`);
    $.ajax({
      dataType: 'json',
      url,
      success: (resp) => {
        console.log('downloaded code');
        console.log(resp);
        this.startTime = resp.length > 0 ? new Date(resp[0].timestamp) : null;
        this.setState({ codeStream: resp });
      },
      error: (a1, a2, a3) => {
        console.log(a1);
        console.log(a2);
        console.log(a3);
      },
    });
  }

  // on time update
  onTimeUpdate(event) {
    // console.log('time update!');
    // console.log(event.timeStamp);
    // Update code based on timestamp
    this.subeditor.editor.setText(this.getBestText(event.target.currentTime * 1000));
  }

  getBestText(timestamp) {
    // console.log(this.state);
    // console.log(this.state.codeStream);
    if (!this.state.codeStream) return '';
    console.log(timestamp);
    let index = 0;
    const startTime = new Date(this.state.codeStream[0].timestamp);
    while (index + 1 < this.state.codeStream.length &&
      (new Date(this.state.codeStream[index + 1].timestamp).getTime() - startTime.getTime()) < timestamp) {
      index += 1;
    }
    console.log(index);
    console.log(this.state.codeStream[index].text);
    return this.state.codeStream[index].text;
  }

  getCurrentLectureName() {
    const splits = this.props.location.pathname.split('/');
    return splits[splits.length - 1];
  }

  render() {
    return (
      <LectureLayout
        videoStream={<ArchiveStream onTimeUpdate={this.onTimeUpdate} codeStream={this.state.codeStream} lectureName={this.getCurrentLectureName()} />}
        codePad={<StudentEditor ref={(r) => { this.subeditor = r; }} codeStream={this.state.codeStream} />}
        consoleOutput={<Console />}
      />
    );
  }
}
