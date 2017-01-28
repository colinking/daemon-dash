import React from 'react';
import $ from 'jquery';

export default class LoginManager extends React.Component {
  constructor() {
    super();
    $.get('/api/req', (resp) => {
      console.log(resp);
      this.state = resp;
    });
  }
}
