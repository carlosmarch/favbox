import React, { Component } from "react";

class Message extends Component {
  render() {
    return (

        <div className={`message mt-s ${this.props.type}`}>{this.props.message}</div>

    );
  }
}

export default Message;
