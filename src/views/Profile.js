import React, { Component } from "react";
import { Link } from 'react-router-dom';
import history from '../history';
import * as Helpers from '../Helpers';

import Header from '../components/Header';
import Footer from '../components/Footer';
import FavItem from '../components/FavItem';
import LoadingSpinner from '../components/LoadingSpinner';
import {ReactComponent as UserIcon} from '../icons/User.svg';
import {ReactComponent as AddIcon} from '../icons/Plus.svg';
import Confetti from '../components/Confetti';

const recommendationController = require('../controllers/recommendationController.js');
const userController = require('../controllers/userController.js');

//AIRTABLE HELPERS
const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
const table = base('contributors');

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      renderItems : [],
      userData  : userController.getSession(),
      pubItems  : userController.getSession().items ? userController.getSession().items.length : '0',
      likeItems : userController.getSession().likes ? userController.getSession().likes.length : '0',
      makeConfetti : this.checkConfetti()
    };
    window.scrollTo(0, 0);
  }

  checkConfetti(){
    if (this.props.location.state?.type === 'success' ){
      return true
    }else{
      return false
    }
  }

  componentDidMount() {
    //Clear history state messages
    if (history.location.state && history.location.state.message) {
        let state = { ...history.location.state };
        delete state.message
        delete state.type
        history.replace({ ...history.location, state });
    }

    const userId = userController.getSession()?.id;
    if (!userId) {
      this.setState({ isLoading: false, renderItems: [] });//WHEN NO SESSION ID
     return
    }

    table.find(userId, async (err, user) => {
      if (err) {
        userController.signOut()
        return
      }
      user.fields['id'] = user.id
      const userData = user.fields;
      if (!userData?.items) this.setState({ isLoading: false, renderItems: [] });//WHEN SESSION && NO ITEMS
      if (!userData?.likes) userData.likes = []

      await recommendationController.hydrateUserPubItems(userData)//@TODO Store data?
      console.log('userData', userData)

      userController.setSession(userData)
      userController.setLocalStorageFavs(userData.likes)

      this.setState({
        isLoading   : false,
        renderItems : userData?.items,
        pubItems    : userData?.items?.length ? userData?.items?.length : '0',
        likeItems   : userData?.likes?.length ? userData?.likes?.length : '0'
      });

    });

  }


  render() {

    return (
    <div className="app_wrapper profile_view">

      { this.state.makeConfetti ? <Confetti /> : ''}

      <Header />
      <div className="global">
          <div className="ArticlesGrid mt-l">
            <div className="container container-s">

              <div className="profile-user mt-xl">

                { userController.getSession().avatar ? (
                  <div className="profile-user-image-holder" style={{backgroundImage: `url(${userController.getSession().avatar})`}}></div>
                ) : (
                  <div className="profile-user-image-holder">
                    <UserIcon />
                  </div>
                )}

                <div className="profile-user-info">
                  <div className="profile-user-name"><h3 className="alt-font">{userController.getSession()?.name}</h3></div>
                  <div className="profile-user-description"><p className="no-m">{userController.getSession()?.description}</p></div>
                  <div className="profile-user-data flex-justify">
                    <div>
                      <span>{ this.state.likeItems } Likes</span>
                      <span>{ this.state.pubItems } Published</span>
                      <span className="text-disabled">0 Following</span>
                      <span className="text-disabled">0 Followers</span>
                    </div>
                    <Link to="/settings" className="edit-profile-button button button-outline button-small">Edit Profile</Link>
                  </div>
                </div>
              </div>

              <div className="mt-m">
              { this.state.isLoading
                  ? <LoadingSpinner />
                  : this.state.renderItems && this.state.renderItems.length > 0
                      ? this.state.renderItems.map( (records, key) => <FavItem {...records} key={key} itemId={records.id} /> )
                      : <div className="empty-pubrecords">
                          <Link to="/create" className="link inline-block mb-s"><AddIcon /> Create</Link>
                          <div>
                            Welcome <span role="img" aria-label="welcome">🎉</span>! Now you can share your referents and they will appear here.
                            <br></br>
                            Or start browsing favs in <Link to="/feed" className="underline">Discover</Link>
                          </div>
                        </div>
              }
              </div>
              <div className="mt-l mb-xl">
                <button className="underline grey auto block" onClick={userController.signOut}>Sign Out</button>
              </div>
            </div>
        </div>
      </div>

      <Footer/>

    </div>
    );
  }
}

export default Profile;
