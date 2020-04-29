import React, { Component } from "react";
import { Link } from 'react-router-dom';
import * as Helpers from '../Helpers';
import Like from './Like';
import Contributor from './Contributor';

class Appcard extends Component {
  render() {

    return (

      <Link to={`/item/${this.props.itemId}`} data-id={this.props.itemId} className="appcard width-6/12 width-12/12@m">

        <div className="appcard-icon-wrap">
          <div className="appcard-icon">
            <Like itemId={this.props.itemId}/>
            <img className="appcard-img" src={this.props.imageUrl} alt="icon"/>
          </div>
        </div>

        <div className="appcard-content">
          <h6 className="appcard-title">{this.props.title}</h6>
          <div className="appcard-description">{Helpers.truncateText(this.props.description, 50)}</div>
          <Contributor contributor={this.props.autor[0]?.fields}/>
        </div>
      </Link>
    );
  }
}

export default Appcard;
