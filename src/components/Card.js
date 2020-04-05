import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Like from './Like';

class Card extends Component {

  render() {

    return (

      <a className="card grid__item width-3/12 width-6/12@m" href={this.props.url} target="_blank" style={{backgroundImage: `url(${this.props.imageUrl})`}} rel="noopener noreferrer">
        <div className={`card-content ${"is-" + this.props.categorias}`}>
          <Like itemId={this.props.itemId}/>
          <div className="card-category badge inline">{this.props.categorias}</div>
          <h3 className="card-title">{this.props.title}</h3>
          <div className="card-description">{this.props.description}</div>
          <div className="card-topics">

            {this.props.temas?.map((topic, key) => {return (<Link to={ '/temas/' + topic } key={key}>#{topic}</Link>)})}

          </div>



          <div className="card-contributor">
            <img src={this.props.autor[0].fields.avatar[0].url} className="contributor-image" alt="icon"/>
            <div className="contributor-info">
              <div className="contributor-name">{this.props.autor[0].fields.name}</div>
              <div className="contributor-description">{this.props.autor[0].fields.description}</div>
            </div>
          </div>

        </div>
      </a>

    );
  }
}

export default Card;
