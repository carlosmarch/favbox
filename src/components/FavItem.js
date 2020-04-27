import React, { Component } from "react";
import Like from './Like';

class FavItem extends Component {

  render() {
      return (
        <a className="favitem" href={this.props.url} target="_blank" rel="noopener noreferrer" data-id={this.props.id}>
          <div className="favitem-image-holder">
            <img className="favitem-image-holder-img" src={this.props.imageUrl} alt="cover"/>
          </div>
          <div className="favitem-description">
            <div className="favitem-category badge inline">{this.props.categorias}</div>
            <h5>{this.props.title}</h5>
            <p className="description-small">{this.props.description}</p>
          </div>
          <Like itemId={this.props.itemId}/>
        </a>
      );
  }
}

export default FavItem;
