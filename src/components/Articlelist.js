import React, { Component } from "react";

class Articlelist extends Component {
  render() {
    return (

      <div className="grid mt-l articlelist">
        <div className="grid__item width-3/12">
          <h3>{this.props.title}</h3>
        </div>
        <div className="grid__item width-7/12">
          <p>{this.props.description}</p>
        </div>
        <div className="grid__item width-2/12">
          <a href={this.props.url} className="arrow" target="_blank">Leer más</a>
        </div>
      </div>
    );
  }
}

export default Articlelist;
