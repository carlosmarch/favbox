import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Like from './Like';

class FavItem extends Component {

  render() {
      return (
        <Link to={`/item/${this.props.id}`} className="favitem" data-id={this.props.id}>
          <div className="favitem-image-holder">
            <img className="favitem-image-holder-img" src={this.props.imageUrl} alt="cover"/>
          </div>
          <div className="favitem-description">
            <div className="favitem-category badge inline">{this.props.categorias}</div>
            <h6>{this.props.title}</h6>
            <p className="description">{this.props.description}</p>
          </div>
          <Like itemId={this.props.itemId}/>
        </Link>
      );
  }
}

export default FavItem;
