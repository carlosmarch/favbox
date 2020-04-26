import React, { Component } from "react";
import * as Helpers from '../Helpers';
import Like from './Like';
import Contributor from './Contributor';

class Appcard extends Component {
  render() {

    return (

      <a className="appcard width-6/12 width-12/12@m" href={this.props.url} target="_blank" rel="noopener noreferrer">

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
      </a>
    );
  }
}

export default Appcard;
