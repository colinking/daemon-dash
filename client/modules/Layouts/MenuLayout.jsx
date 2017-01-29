import React from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import { Menu, Button } from 'semantic-ui-react';

import styles from './LectureLayout.scss';

export default class MenuLayout extends React.Component {

  static logout() {
    $.post('/api/logout', (resp) => {
      if (!resp.error) {
        browserHistory.push('/');
      } else {
        console.error(resp.error);
      }
    });
  }

  render() {
    return (
      <Menu size="large" className={styles.menuHeader}>
        <Menu.Item name="Shipit" />

        <Menu.Menu position="right">
          <Menu.Item>
            <Button primary onClick={MenuLayout.logout}>Logout</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
