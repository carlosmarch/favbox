import React, { Component } from "react";
import Like from './Like';

class FavItem extends Component {

  constructor() {
    super();
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 500;

    if (isMobile) {
      return (
        <a className="articlelist" href={this.props.url} target="_blank" rel="noopener noreferrer" data-id={this.props.id} >
          <div className="articlelist-title">
            <div className="articlelist-category badge inline">{this.props.categorias}</div>
            <h5>{this.props.title}</h5>
          </div>
          <div className="articlelist-description">
            <p>{this.props.description}</p>
          </div>
          <Like itemId={this.props.itemId}/>
        </a>
      );
    } else {
      return (
        <a className="articlelist" href={this.props.url} target="_blank" rel="noopener noreferrer" data-id={this.props.id}>
          <div className="articlelist-title">
            <h5>{this.props.title}</h5>
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
}

export default FavItem;
