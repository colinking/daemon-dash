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
  }

  componentDidMount() {
    const url = `/public/archives/code/${this.getCurrentLectureName()}.json`;
    console.log(`Downloading: ${url}`);
    $.get(url, (resp) => {
      console.log('downloaded code');
      console.log(resp);
      console.log(url);
      this.setState({ codeStream: resp });
    });
  }

  // on time update
  onTimeUpdate(event) {
    // console.log('time update!');
    // console.log(event.timeStamp);
    // Update code based on timestamp
    this.subeditor.editor.setText(this.getBestText(event.timeStamp));
  }

  getBestText(timestamp) {
    // console.log(this.state);
    // console.log(this.state.codeStream);
    if (!this.state.codeStream) return '';
    return this.state.codeStream[4];
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
