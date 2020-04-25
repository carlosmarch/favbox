import React, { Component } from "react";
import {ReactComponent as UserIcon} from '../icons/User.svg';

//@TODO
//REVIEW DEFAULT VALUES && EMPTY USERS
//this.props.contributor.avatar[0].url

class Contributor extends Component {

  render() {
    if(!this.props.contributor) return(
      <div className="contributor"></div>
    )
    return (

      <div className="contributor">
        <div className="user-badge">
          <UserIcon />
        </div>
        <div className="contributor-info">
          <div className="contributor-name">{this.props.contributor.name}</div>
          <div className="contributor-description">{this.props.contributor.description}</div>
        </div>
      </div>
    );
  }
}

export default Contributor;
