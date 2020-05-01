import React, { Component } from "react";

import Header from '../components/Header';
import Footer from '../components/Footer';
import BlockTitle from '../components/BlockTitle';
import FavItem from '../components/FavItem';
import LoadingSpinner from '../components/LoadingSpinner';
import {ReactComponent as LikeIcon} from '../icons/Heart.svg';

const recommendationController = require('../controllers/recommendationController.js');
const userController = require('../controllers/userController.js');

//AIRTABLE HELPERS
const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
const table = base('contributors');

class Likes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      renderItems : [],
    };
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    const userId = userController.getSession()?.id;
    if (!userId) {
      //WHEN NO SESSION && NO EMAIL
      this.setState({ isLoading: false, renderItems: [] });
     return
    }

    table.find(userId, async (err, user) => {
      if (err) {
        console.error(err)
        userController.signOut()
        return
      }

      const userData = user?.fields;
      if (!userData?.likes) userData.likes = []
      userController.setLocalStorageFavs(userData.likes)
      let userLikes = await recommendationController.getHydratedFavItems(userData.likes)

      this.setState({
        isLoading: false,
        renderItems: userLikes
      });
      //console.log('hydratedFavItems',  user.likes, hydratedFavItems)
      return;
    })

  }


  render() {

    return (
    <div className="app_wrapper profile_view">

      <Header />
      <div className="global">
        <div className="container container-m">
          <div className="ArticlesGrid mt-l">
            <BlockTitle title={'Likes'}/>

            <div className="container">
              <div className="mt-s">
                { this.state.isLoading
                    ? <LoadingSpinner />
                    : this.state.renderItems && this.state.renderItems.length > 0
                        ? this.state.renderItems.map( (records, key) => <FavItem {...records} key={key} itemId={records.id} /> )
                        : <div className="empty-pubrecords">
                            <LikeIcon className="icon-40 icon-grey mb-s"/>
                            <div>Hey! Your favourite items will appear here. You can start by clicking the heart icon on any item.</div>
                          </div>
                }
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer/>

    </div>
    );
  }
}

export default Likes;
