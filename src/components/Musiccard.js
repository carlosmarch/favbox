import React, { Component } from "react";
import Like from './Like';
import Contributor from './Contributor';

class Musiccard extends Component {
  render() {


    return (
      <div className="musiccard width-3/12 width-4/12@m">
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
      </div>
    );
  }
}

export default Musiccard;