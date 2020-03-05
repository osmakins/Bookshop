import React, { Component } from 'react';

class Like extends Component {

  render() {
    let iclass = "fa fa-heart";
    if (!this.props.liked) iclass += "-o";
    return (<i className={iclass} aria-hidden="true" onClick={this.props.onToggleLike} style={{ cursor: "pointer" }}></i>);
  }
}

export default Like;