import React, { Component } from "react";

class BlockTitle extends Component {
  render() {

    return (
        <div className="container">
          <h3 className="block-title">{this.props.title}</h3>
          <p className="block-description">{this.props.description}</p>
        </div>
    );
  }
}

export default BlockTitle;
