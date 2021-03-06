import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Collectioncard extends Component {
  render() {
    return (

        <Link to={ '/collection/' + this.props.title } className={`grid__item collection-card bg-cyan ${this.props.grid} width-12/12@m`}>
          <div className="collection-card__title-container">
            <h3 className="collection-card__title">
              {this.props.title}
            </h3>
          </div>
          <div className="collection-card__number">{this.props.number} Items</div>
      </Link>
    );
  }
}

export default Collectioncard;
