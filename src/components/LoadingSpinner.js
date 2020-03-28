import React, { Component } from "react";

class LoadingSpinner extends Component {
  render() {

    return (
        <div className="container loader-container">
          <div className="rotating-wrapper">
            <img src={process.env.PUBLIC_URL + '/img/text.svg'} className="rotating-text rotating" alt="Mequedoencasa"/>
          </div>
        </div>
    );
  }
}

export default LoadingSpinner;
