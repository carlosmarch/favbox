import React, { Component } from "react";
import { Link } from 'react-router-dom';
import * as Helpers from '../Helpers';
import Like from './Like';
import {ReactComponent as EditIcon} from '../icons/Edit.svg';

//@TODO ITEM ID

class FavItem extends Component {

  render() {
      return (
        <Link to={`/item/${this.props.itemId}`} data-id={this.props.itemId} className="favitem">
          <div className="favitem-image-holder">
            <img className="favitem-image-holder-img" src={this.props.imageUrl} alt="cover"/>
          </div>
          <div className="favitem-description">
            <div className="favitem-category badge inline">{this.props.categories}</div>
            <h6>{this.props.title}</h6>
            <p className="description">{Helpers.truncateText(this.props.description, 180)}</p>

            { JSON.stringify(this.props.contribuidor) === JSON.stringify([JSON.parse(localStorage.getItem('userSession'))?.id])
              ? <Link to={`/edit/${this.props.itemId}`} data-id={this.props.itemId} className="edit-link link underline-hover"><EditIcon className="icon-14 icon-interaction"/> Edit</Link>
              : '' }

          </div>
          <Like itemId={this.props.itemId}/>
        </Link>
      );
  }
}

export default FavItem;
