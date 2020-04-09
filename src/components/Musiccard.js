import React, { Component } from "react";
import Like from './Like';
import Contributor from './Contributor';

class Musiccard extends Component {
  render() {


    return (
      <a className="musiccard width-3/12 width-6/12@m" href={this.props.url} target="_blank" rel="noopener noreferrer">
        <div className="musiccard-album">
          <Like itemId={this.props.itemId}/>
          <div className="musiccard-album-contents">
            <img className="play" src={process.env.PUBLIC_URL + '/img/play.svg'} alt="play"/>
            <Contributor contributor={this.props.autor[0].fields}/>
          </div>
          <img className="musiccard-album-img" src={this.props.imageUrl} alt="cover"/>
        </div>
        <h6 className="musiccard-title">{this.props.title}</h6>
        <div className="musiccard-description">{this.props.description}</div>
      </a>
    );
  }
}

export default Musiccard;
