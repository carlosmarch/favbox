import React, { Component } from "react";

class Card extends Component {
  render() {

    return (

      <a className="card" href={this.props.url} target="_blank" style={{backgroundImage: `url(${this.props.imageUrl})`}} rel="noopener noreferrer">
        <div className={`card-content ${"is-" + this.props.categorias}`}>
          <div className="card-category badge inline">{this.props.categorias}</div>
          <h3 className="card-title">{this.props.title}</h3>
          <div className="card-description">{this.props.description}</div>
          <div className="card-topics">

            {this.props.temas.map((topic, key) => {return (<span key={key}>#{topic}</span>)})}

          </div>
          <div className="card-contributor">
            <img src={process.env.PUBLIC_URL + '/img/user_icon.png'} className="contributor-image" alt="icon"/>
            <div className="contributor-name">{this.props.contributor}</div>
          </div>
        </div>
      </a>

    );
  }
}

export default Card;
