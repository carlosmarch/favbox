import React, { Component } from "react";

class Like extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLike: localStorage.getItem(this.props.itemId) !== null //True if NOT exists
    };
  }

  handleLike = (e) => {

    console.log('handlelike')
    e.preventDefault();
    const item = e.target.value;
    console.log('hola', item);

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
    console.log(this.props.itemId, this.state.isLike)
    return (
      <div className="like">
        <button className={"likebutton is-like-"+`${this.state.isLike}`} value={this.props.itemId} onClick={this.handleLike}>❤</button>
      </div>
    );
  }
}

export default Like;
