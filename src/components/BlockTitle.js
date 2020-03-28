import React, { Component } from "react";

class BlockTitle extends Component {
  render() {

    return (
        <div className="container">
          <h2 className={`block-title ${this.props.titleclass}`}>{this.props.title}</h2>
          <p className={`block-description ${this.props.descriptionclass}`}>{this.props.description}</p>
        </div>
    );
  }
}

export default BlockTitle;
