import React, { Component } from "react";
import { Link } from 'react-router-dom';
import * as Helpers from '../Helpers';
import Like from './Like';
import Contributor from './Contributor';

class Videocard extends Component {
  render() {

    return (
      <Link to={`/item/${this.props.itemId}`} data-id={this.props.itemId} className="videocard width-4/12 width-6/12@m">
        <Like itemId={this.props.itemId}/>
        <div className="videocard-cover">
          <img className="play" src={process.env.PUBLIC_URL + '/img/play.svg'} alt="play"/>
          <img className="videocard-cover-img" src={this.props.imageUrl} alt="cover"/>
        </div>
        <h6 className="videocard-title">{Helpers.truncateText(this.props.title, 40)}</h6>
        <div className="videocard-description">{Helpers.truncateText(this.props.description, 90)}</div>
        <Contributor contributor={this.props.autor[0]?.fields}/>
      </Link>
    );
  }
}

export default Videocard;
