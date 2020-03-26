import React, { Component } from "react";

class Musiccard extends Component {
  render() {


    return (
      <div className="musiccard width-3/12">
        <div className="musiccard-album">
          <div className="musiccard-album-contents">
            <img className="play" src={process.env.PUBLIC_URL + '/img/play.svg'} alt="play"/>
          </div>
          <img className="musiccard-album-img" src={this.props.imageUrl} alt="cover"/>
        </div>
        <h5 className="musiccard-title">{this.props.title}</h5>
        <div className="musiccard-description">{this.props.description}</div>
      </div>
    );
  }
}

export default Musiccard;
