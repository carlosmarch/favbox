import React, { Component } from "react";

class Podcastcard extends Component {
  render() {


    return (
      <a className="podcastcard width-6/12" href={this.props.url} target="_blank" >

        <div className="podcastcard-album">
          <div className="podcastcard-album-contents">
            <img className="play" src={process.env.PUBLIC_URL + '/img/play.svg'} alt="play"/>
          </div>
          <img className="podcastcard-album-img" src={this.props.imageUrl} alt="cover"/>
        </div>
        <div className="podcastcard-content">
          <h6 className="podcastcard-title">{this.props.title}</h6>
          <div className="podcastcard-description">{this.props.description}</div>
        </div>

      </a>
    );
  }
}

export default Podcastcard;
