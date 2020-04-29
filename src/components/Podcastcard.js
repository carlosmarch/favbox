import React, { Component } from "react";
import { Link } from 'react-router-dom';
import * as Helpers from '../Helpers';
import Like from './Like';
import Contributor from './Contributor';

class Podcastcard extends Component {
  render() {


    return (
      <Link to={`/item/${this.props.itemId}`} data-id={this.props.itemId} className="podcastcard width-6/12 width-12/12@m">

        <div className="podcastcard-album">
          <div className="podcastcard-album-contents">
            <img className="play" src={process.env.PUBLIC_URL + '/img/play.svg'} alt="play"/>
          </div>
          <img className="podcastcard-album-img" src={this.props.imageUrl} alt="cover"/>
        </div>
        <Like itemId={this.props.itemId}/>
        <div className="podcastcard-content">
          <h6 className="podcastcard-title">{this.props.title}</h6>
          <div className="podcastcard-description">{Helpers.truncateText(this.props.description, 70)}</div>
          <Contributor contributor={this.props.autor[0]?.fields}/>
        </div>

      </Link>
    );
  }
}

export default Podcastcard;
