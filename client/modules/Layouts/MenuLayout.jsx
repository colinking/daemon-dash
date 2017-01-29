import React from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import { Menu, Button } from 'semantic-ui-react';

import IO from 'socket.io-client';

import styles from './LectureLayout.scss';

export default class MenuLayout extends React.Component {

  constructor(props) {
    super(props);

    this.socket = IO();

    this.startRecordSession = this.startRecordSession.bind(this);
    this.endRecordSession = this.endRecordSession.bind(this);
  }

  static logout() {
    $.post('/api/logout', (resp) => {
      if (!resp.error) {
        browserHistory.push('/');
      } else {
        console.error(resp.error);
      }
    });
  }

  startRecordSession() {
    this.socket.emit("START_RECORD_SESSION", {name: "SOME RANDOM SESSION"});
  }

  endRecordSession() {
    this.socket.emit('END_RECORD_SESSION');
  }

  render() {
    return (
      <Menu size="large" className={styles.menuHeader}>
        <Menu.Item href="/" name="Shipit" active={this.props.activeTab === 'home'} />
        <Menu.Item href="/archive" active={this.props.activeTab === 'archive'} name="Archives" />

        <Menu.Menu position="right">
          <Menu.Item>
            <Button primary onClick={MenuLayout.logout}>Logout</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

MenuLayout.propTypes = {
  activeTab: React.PropTypes.string,
};
