import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Like from './Like';
import Contributor from './Contributor';

class Card extends Component {

  render() {

    return (

      <Link to={`/item/${this.props.itemId}`} data-id={this.props.itemId} className="card grid__item width-3/12 width-6/12@m" style={{backgroundImage: `url(${this.props.imageUrl})`}}>
        <Like itemId={this.props.itemId}/>
        <div className={`card-content ${"is-" + this.props.categorias}`}>
          <div className="card-category badge inline">{this.props.categorias}</div>
          <h3 className="card-title">{this.props.title}</h3>
          <div className="card-description">{this.props.description}</div>
          <Contributor contributor={this.props.autor[0]?.fields}/>
        </div>
      </Link>

    );
  }
}

export default Card;
