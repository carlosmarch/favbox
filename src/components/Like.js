import React, { Component } from "react";
import {ReactComponent as LikeIcon} from '../icons/Heart.svg';
import {ReactComponent as LikeIconActive} from '../icons/HeartFull.svg';
import history from '../history';
const userController = require('../controllers/userController.js');

class Like extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLike: localStorage.getItem(this.props.itemId) !== null  //Default False -> if NOT NULL ||  if Exists -> True
    };

  }


  handleLike = (e) => {
    console.log('handleLike',this.props.itemId)
    e.preventDefault();
    const item = e.target.value;
    if ( !userController.isAuthenticated() ){
      history.push({ pathname: '/signup' })
      return
    }
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
    let likeicon;
    //likeicon.removeEventListener('click')
    if (this.state.isLike) {
      likeicon = <LikeIconActive />;
    } else {
      likeicon = <LikeIcon />;
    }

    return (
      <div className="like">
        <button className={`likebutton is-like-${this.state.isLike}`} value={this.props.itemId} onClick={this.handleLike}>
            {likeicon}
        </button>
      </div>
    );
  }
}

export default Like;
