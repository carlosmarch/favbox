import React, { Component } from "react";
import {ReactComponent as LikeIcon} from '../icons/Heart.svg';
import {ReactComponent as LikeIconActive} from '../icons/HeartFull.svg';
import history from '../history';
const userController = require('../controllers/userController.js');


const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
const table = base('contributors');



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
    const userid = userController.getSession()?.id;
    const itemId = this.props.itemId

    if ( !userController.isAuthenticated() ){
      history.push({ pathname: '/signup' })
      return
    }

    if (localStorage.getItem(item) === null) {
      //CREATE a like
      //First local
      localStorage.setItem(item, true);
      this.setState({isLike: true});
      //GET table likes
      let likeArr = []
      table.find(userid, (err, record) => {
          if (err) {
            console.error(err)
            return
          }
          if(typeof record.get('likes') === 'undefined') {
             //empty
             likeArr.push(itemId)
          }else{
            likeArr = record.get('likes')
            likeArr.push(itemId)
          }
          //UPDATE Table likes with added
          table.update( userid, { likes: likeArr, },
            function(err, record) {
              if (err) {
                console.error(err);
                return;
              }
              //console.log('created', likeArr)
            }
          );
      })
      return true


    }else{
      //REMOVE the like
      //First local
      localStorage.removeItem(item);
      this.setState({isLike: false});
      //GET table likes
      let filtered = []
      table.find(userid, (err, record) => {
        if (err) {
          console.error(err)
          return
        }
        if(typeof record.get('likes') === 'undefined') {
           //empty
           return
        }else{
          filtered = record.get('likes').filter(item => item !== itemId)
          //console.log('filtered',filtered)
        }
        //UPDATE Table likes removing the like
        table.update( userid, { likes: filtered, },
          function(err, record) {
            if (err) {
              console.error(err);
              return;
            }
            //console.log('removed', filtered)
          }
        )
      })
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
