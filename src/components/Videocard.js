import React, { Component } from "react";
import Like from './Like';
import Contributor from './Contributor';

class Videocard extends Component {
  render() {

    return (
      <div className="videocard width-4/12 width-6/12@m">
        <a className="videocard-cover" href={this.props.url} target="_blank" rel="noopener noreferrer">
          <Like itemId={this.props.itemId}/>
          <img className="play" src={process.env.PUBLIC_URL + '/img/play.svg'} alt="play"/>
          <img className="videocard-cover-img" src={this.props.imageUrl} alt="cover"/>
        </a>
        <h6 className="videocard-title">{this.props.title}</h6>
        <div className="videocard-description">{this.props.description}</div>
        <Contributor contributor={this.props.autor[0].fields}/>
      </div>
    );
  }
}

export default Videocard;
