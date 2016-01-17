import React, { Component } from 'react';

export default class AppShell extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
