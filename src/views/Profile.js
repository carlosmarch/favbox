import React, { Component } from "react";

import * as Helpers from '../Helpers';

import Header from '../components/Header';
import Footer from '../components/Footer';
import BlockTitle from '../components/BlockTitle';
import FavItem from '../components/FavItem';
import LoadingSpinner from '../components/LoadingSpinner';

//AIRTABLE HELPERS
const data = require('../controllers/dataController.js');
const recommendationController = require('../controllers/recommendationController.js');

const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
const table = base('contributors');

const email = Helpers.getSessionEmail();

const options = {
  filterByFormula: `OR(email = '${email}', name = '${email}')`
}

//@TODO
//REVIEW DEFAULT VALUES && EMPTY USERS
//REVIEW WHEN USER JUST SIGNED UP

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      userData  : []
    };
  }

  getUserPubItems(){
    data.getAirtableRecords(table, options)
      .then( async (users) => {

        if (!users.length) {
          //WHEN NO SESSION && NO EMAIL
          this.setState({
            isLoading: false,
            renderItems: []
          });
         return
        }
        
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
        console.log(this.state.userData)
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

    return (
    <div className="app_wrapper profile_view">

      <Header />
      <div className="global">
        <div className="container">
          <div className="ArticlesGrid mt-l">
            <BlockTitle title={'Profile'}/>

            <div className="container">
              <div className="mt-s">
              {this.state.isLoading ? <LoadingSpinner /> : this.state.renderItems && this.state.renderItems.length > 0 ? this.state.renderItems.map((records) =>
                <FavItem {...records} key={records.id} itemId={records.id} />
              ): 'No items' }
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

export default Profile;
