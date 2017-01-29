import React from 'react';

import { Header } from 'semantic-ui-react';
import $ from 'jquery';

export default class Archive extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lectures: [],
    };
  }

  render() {
    const className = 'CMSC 216';

    $.get('/api/lectures')
      .then((d) => { this.setState({ lectures: d }); });

    return (
      <div>
        <Header as="h3" textAlign="center">{className}</Header>


      </div>
    );
  }
}
