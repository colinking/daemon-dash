import React from 'react';

import { Menu, Segment } from 'semantic-ui-react';

import QuestionAnswerPanel from '../QuestionAnswerPanel/QuestionAnswerPanel';
import ConsoleFeed from '../ConsoleFeed/ConsoleFeed';

import styles from './Console.scss';

export default class Console extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'Console'
    };

    this.handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  }

  render() {
    let { activeItem } = this.state;
    return (
      <div className={styles.container}>
        <Menu attached='top' pointing secondary className={styles.menu}>
          <Menu.Item name='Console' active={activeItem === 'Console'} onClick={this.handleItemClick} />
          <Menu.Item name='QA' active={activeItem === 'QA'} onClick={this.handleItemClick} />
        </Menu>
        { this.state.activeItem === 'Console' ? <ConsoleFeed className={styles.body}/> : null}
        { this.state.activeItem === 'QA' ? <QuestionAnswerPanel className={styles.body} isStudent={this.props.isStudent} /> : null}
      </div>
    )
  }
}
