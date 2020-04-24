import React, { Component } from "react";
import { Link } from 'react-router-dom';
import * as Helpers from '../Helpers';

import Header from '../components/Header';
import Footer from '../components/Footer';
import BlockTitle from '../components/BlockTitle';
import FavItem from '../components/FavItem';
import LoadingSpinner from '../components/LoadingSpinner';
import {ReactComponent as UserIcon} from '../icons/User.svg';
import {ReactComponent as AddIcon} from '../icons/Plus.svg';

const dataController = require('../controllers/dataController.js');
const recommendationController = require('../controllers/recommendationController.js');
const userController = require('../controllers/userController.js');

//AIRTABLE HELPERS
const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);



class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      userData  : []
    };
  }

  getUserPubItems(){

    const email = userController.getSession()?.email;


    if (!email) {
      //WHEN NO SESSION && NO EMAIL
      this.setState({
        isLoading: false,
        renderItems: []
      });
     return
    }
    const table = base('contributors');
    const options = { filterByFormula: `OR(email = '${email}', name = '${email}')` }
    dataController.getAirtableRecords(table, options)
      .then( async (users) => {
        //USERS SHOULD BE ONLY ONE THAT MATCH WITH EMAIL
        const userData = users[0].fields;
        const hydratedUserWithPubItems = [];
        //REPLACE LIKES ID's WITH ALL THE CONTENT
        hydratedUserWithPubItems.push(await recommendationController.hydrateUserPubItems(userData));
        this.setState({
          isLoading: false,
          userData: userData,
          renderItems: userData.items
        });
        //SOTORE IN LOCAL TO AVOID EXTRA CALLS IN OTHER VIEWS?? not used
        //userController.setStorage('pubItems', userData.items)
      })
      .catch(err => {
        console.log( Error(err));
      });
  }



  componentDidMount() {
    //@TODO CHECK NEW USERS WITH EMPTY DATA
    //REVIEW WHEN USERS DON'T HAVE PUBLISHED ITEMS && FAV ITEMS
    this.getUserPubItems()
  }


  render() {
    console.log('getStorageFavs',Helpers.getStorageFavs().length)
    return (
    <div className="app_wrapper profile_view">

      <Header />
      <div className="global">
          <div className="ArticlesGrid mt-l">
            <div className="container container-s">

              <div className="profile-user mt-xl">
                <div className="profile-user-image-holder">
                  <UserIcon />
                </div>
                <div className="profile-user-info">
                  <div className="profile-user-name"><h3>{userController.getSession()?.name}</h3></div>
                  <div className="profile-user-description"><p>{userController.getSession()?.description}</p></div>
                  <div className="profile-user-data">
                    <span>{ Helpers.getStorageFavs() ? Helpers.getStorageFavs()?.length : '0'} Likes</span>
                    <span>{ userController.getSession()?.hasOwnProperty('items') ? userController.getSession().items.length : '0'} Published</span>
                    <span>{ userController.getSession()?.hasOwnProperty('following') ? userController.getSession().following.length : '0'} Following</span>
                    <span>{ userController.getSession()?.hasOwnProperty('followers') ? userController.getSession().followers.length : '0'} Followers</span>
                  </div>
                </div>
              </div>

              <div className="mt-m">
              { this.state.isLoading
                  ? <LoadingSpinner />
                  : this.state.renderItems && this.state.renderItems.length > 0
                      ? this.state.renderItems.map( (records) => <FavItem {...records} key={records.id} itemId={records.id} /> )
                      : <div className="empty-pubrecords">
                          <Link to="/create" className="link inline-block mb-s"><AddIcon /> Create</Link>
                          <div>Welcome! Now you can share your referents and they will appear here.</div>
                        </div>
              }
              </div>
              <button class="link auto block pt-l" onClick={userController.signOut}>Sign Out</button>
            </div>
        </div>
      </div>

      <Footer/>

    </div>
    );
  }
}

export default Profile;
