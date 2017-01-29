import React from 'react';

import { Menu, Segment } from 'semantic-ui-react';

import QuestionAnswerPanel from '../QuestionAnswerPanel/QuestionAnswerPanel';
import ConsoleFeed from '../ConsoleFeed/ConsoleFeed';

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
      <div>
        <Menu attached='top' tabular>
          <Menu.Item name='Console' active={activeItem === 'Console'} onClick={this.handleItemClick} />
          <Menu.Item name='QA' active={activeItem === 'QA'} onClick={this.handleItemClick} />
        </Menu>
        { this.state.activeItem === 'Console' ? <ConsoleFeed /> : null}
        { this.state.activeItem === 'QA' ? <QuestionAnswerPanel /> : null}
      </div>
    )
  }
}
