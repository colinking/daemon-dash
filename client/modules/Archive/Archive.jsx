import React from 'react';

import { Header } from 'semantic-ui-react';
import $ from 'jquery';

import ClassCard from './ClassCard';

export default class Archive extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lectures: [],
    };
  }

  componentWillMount() {
    $.get('/api/lectures')
      .then((d) => { this.setState({ lectures: d.lectures }); });
  }

  render() {
    const className = 'CMSC 216';

    let cards = [];
    if (this.state.lectures) {
      cards = this.state.lectures.map(lecture =>
        <ClassCard
          key={lecture.name}
          start={new Date(lecture.start)}
          name={lecture.name}
          live={lecture.live}
        />);
    }

    return (
      <div>
        <Header as="h2" textAlign="center">{className}</Header>
        { cards }
      </div>
    );
  }
}
