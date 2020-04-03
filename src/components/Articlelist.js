import React, { Component } from "react";

class Articlelist extends Component {
  render() {
    return (

      <div className="articlelist">
        <div className="articlelist-title">
          <div className="articlelist-category badge inline">{this.props.categorias}</div>
          <h3>{this.props.title}</h3>
        </div>
        <div className="articlelist-description">
          <p>{this.props.description}</p>
        </div>
        <div className="articlelist-link">
          <a href={this.props.url} className="arrow" target="_blank" rel="noopener noreferrer">Leer más</a>
        </div>
      </div>
    );
  }
}

export default Articlelist;
