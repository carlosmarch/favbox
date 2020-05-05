import React, { Component } from "react";
import * as Helpers from '../Helpers';

class NewBadge extends Component {

  render() {
    return (

          this.props?.createdTime && Helpers.dayDifference(this.props?.createdTime) < 7
          ? (<div className="new-badge">New</div>)
          : ''

    );
  }
}

export default NewBadge;
