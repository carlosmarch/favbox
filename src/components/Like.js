import React, { Component } from "react";

class Like extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLike: localStorage.getItem(this.props.itemId) !== null //Default False -> if NOT NULL ||  if Exists -> True
    };
  }

  handleLike = (e) => {

    e.preventDefault();
    const item = e.target.value;

    if (localStorage.getItem(item) === null) {
      //Set a like
      localStorage.setItem(item, true);
      this.setState({isLike: true});
      return true
    }else{
      //Remove the like
      localStorage.removeItem(item);
      this.setState({isLike: false});
      return false
    }
  }

  render() {

    return (
      <div className="like">
        <button className={`likebutton is-like-${this.state.isLike}`} value={this.props.itemId} onClick={this.handleLike}>❤</button>
      </div>
    );
  }
}

export default Like;
