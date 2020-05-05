import React, { Component } from "react";
import { Link } from 'react-router-dom';
import * as Helpers from '../Helpers';
import Like from './Like';
import Contributor from './Contributor';
import NewBadge from './NewBadge';

class Card extends Component {

  render() {

    return (

      <Link to={`/item/${this.props.itemId}`} data-id={this.props.itemId} className="card grid__item width-3/12 width-6/12@m" style={{backgroundImage: `url(${this.props.imageUrl})`}}>
        <Like itemId={this.props.itemId}/>
        <NewBadge createdTime={this.props.createdTime} />
        <div className={`card-content ${"is-" + this.props.categories}`}>
          <div className="card-category badge inline">{this.props.categories}</div>
          <h3 className="card-title">{this.props.title}</h3>
          <div className="card-description no@m">{Helpers.truncateText(this.props.description, 180)}</div>
          <Contributor contributor={this.props.autor[0]?.fields} />
        </div>
      </Link>

    );
  }
}

export default Card;
