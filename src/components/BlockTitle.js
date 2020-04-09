import React, { Component } from "react";
import { Link } from 'react-router-dom';

class BlockTitle extends Component {
  render() {

    return (
        <div className="container title-block">
          {this.props.link ? <Link to={this.props.link} className={`block-title title-has-arrow ${this.props.titleclass}`}>{this.props.title}</Link> : <h2 className={`block-title ${this.props.titleclass}`}>{this.props.title}</h2>}
          <p className={`block-description ${this.props.descriptionclass}`}>{this.props.description}</p>
        </div>
    );
  }
}

export default BlockTitle;
