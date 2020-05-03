import React, { Component } from "react";
import {ReactComponent as UserIcon} from '../icons/User.svg';
import { Link } from 'react-router-dom';

//@TODO
//REVIEW DEFAULT VALUES && EMPTY USERS
//this.props.contributor.avatar[0].url

class Contributor extends Component {

  render() {
    console.log(this.props.contributor)
    if(!this.props.contributor) return(
      <div className="contributor"></div>
    )

    return (

      <div className="contributor">

        { this.props.contributor.avatar ? (
          <div className="user-badge" style={{backgroundImage: `url(${this.props.contributor.avatar})`}}></div>
        ) : (
          <div className="user-badge">
            <UserIcon />
          </div>
        )}

        <div className="contributor-info">
          <Link to={`/profile/${this.props.contributor.name}`} className="contributor-name link-inverted">{this.props.contributor.name}</Link>
          <div className="contributor-description">{this.props.contributor.description}</div>
        </div>
      </div>
    );
  }
}

export default Contributor;
