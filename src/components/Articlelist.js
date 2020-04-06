import React, { Component } from "react";
import Like from './Like';
import Contributor from './Contributor';

class Articlelist extends Component {
  render() {
    return (

      <a className="articlelist" href={this.props.url} target="_blank" rel="noopener noreferrer">
        <div className="articlelist-title">
          <h5>{this.props.title}</h5>
          <Contributor contributor={this.props.autor[0].fields}/>
        </div>
        <div className="articlelist-description">
          <div className="articlelist-category badge inline">{this.props.categorias}</div>
          <p>{this.props.description}</p>
        </div>
        <Like itemId={this.props.itemId}/>
      </a>
    );
  }
}

export default Articlelist;
