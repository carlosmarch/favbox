import React, { Component } from "react";

class Videocard extends Component {
  render() {

    return (
      <div className="videocard width-4/12 width-6/12@m">
        <div className="videocard-cover">
          <img className="play" src={process.env.PUBLIC_URL + '/img/play.svg'} alt="play"/>
          <img className="videocard-cover-img" src={this.props.imageUrl} alt="cover"/>
        </div>
        <h6 className="videocard-title">{this.props.title}</h6>
        <div className="videocard-description">{this.props.description}</div>
      </div>
    );
  }
}

export default Videocard;
