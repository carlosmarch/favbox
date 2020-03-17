import React, { Component } from "react";

class BlockTitle extends Component {
  render() {
    
    return (
        <div className="container">
          <h3>{this.props.title}</h3>
          <p>{this.props.description}</p>
        </div>
    );
  }
}

export default BlockTitle;
