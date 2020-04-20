import React, { Component } from "react";

//@TODO
//REVIEW DEFAULT VALUES && EMPTY USERS


class Contributor extends Component {

  render() {

    return (
      <div className="contributor">
        <img src={this.props.contributor.avatar[0].url} className="contributor-image" alt="icon"/>
        <div className="contributor-info">
          <div className="contributor-name">{this.props.contributor.name}</div>
          <div className="contributor-description">{this.props.contributor.description}</div>
        </div>
      </div>
    );
  }
}

export default Contributor;
