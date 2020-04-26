import React, { Component } from "react";
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import FavItem from '../components/FavItem';
import LoadingSpinner from '../components/LoadingSpinner';
import {ReactComponent as UserIcon} from '../icons/User.svg';
import {ReactComponent as AddIcon} from '../icons/Plus.svg';

const dataController = require('../controllers/dataController.js');
const recommendationController = require('../controllers/recommendationController.js');

//AIRTABLE HELPERS
const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);



class ExternalProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading   : true,
      renderItems : [],
      pubItems    : 0,
      likeItems   : 0,
      urlName     : decodeURIComponent(window.location.pathname.split("/").pop())
    };

  }

  getUserPubItems(){
    const table = base('contributors');
    const options = { filterByFormula: `{name} = '${this.state.urlName}'` }

    dataController.getAirtableRecords(table, options)
      .then( async (users) => {
        //USERS SHOULD BE ONLY ONE THAT MATCH WITH EMAIL
        const userData = users[0]?.fields;
        if (!userData?.items) {
          this.setState({ isLoading: false, renderItems: [] });//WHEN SESSION && NO ITEMS
        }
        if (!userData?.likes) userData.likes = []
        const hydratedUserWithPubItems = [];
        //REPLACE LIKES ID's WITH ALL THE ITEM'S CONTENT
        hydratedUserWithPubItems.push(await recommendationController.hydrateUserPubItems(userData) );

        this.setState({
          isLoading   : false,
          renderItems : userData?.items,
          pubItems    : userData?.items?.length ? userData?.items?.length : '0',
          likeItems   : userData?.likes?.length ? userData?.likes?.length : '0'
        });
      })
      .catch(err => {
        console.log( Error(err));
      });
  }



  componentDidMount() {
    console.log('HEY', this.state.urlName)
    //REVIEW WHEN USER LIKES HIS OWN ITEMS && UPDATE COUNTER
    this.getUserPubItems()
  }


  render() {

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
                  <div className="profile-user-name"><h3>{this.state.urlName}</h3></div>
                  <div className="profile-user-description"><p>{this.state?.urlName}</p></div>
                  <div className="profile-user-data">
                    <span>{ this.state.likeItems } Likes</span>
                    <span>{ this.state.pubItems } Published</span>
                    <span>0 Following</span>
                    <span>0 Followers</span>
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
                          <div>Welcome <span role="img" aria-label="welcome">🎉</span>! Now you can share your referents and they will appear here.</div>
                        </div>
              }
              </div>

            </div>
        </div>
      </div>

      <Footer/>

    </div>
    );
  }
}

export default ExternalProfile;
