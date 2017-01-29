import React from 'react';

import { Feed, Segment } from 'semantic-ui-react';

import IO from 'socket.io-client';

export default class ConsoleFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      feed: [

      ]
    }

    this.socket = IO();

  }

  render() {
    return (
      <Segment attached>
        <Feed size='small'>

        </Feed>
      </Segment>
    );
  }
}
