import React, { Component } from "react";

import * as Helpers from '../Helpers';

import Header from '../components/Header';
import Footer from '../components/Footer';
import BlockTitle from '../components/BlockTitle';
import FavItem from '../components/FavItem';
import LoadingSpinner from '../components/LoadingSpinner';

//AIRTABLE HELPERS
const Airtable = require('airtable');
const data = require('../controllers/dataController.js');
const recommendation = require('../controllers/recommendationController.js');

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
const table = base('contributors');

const email = Helpers.getSessionEmail();

const options = {
  filterByFormula: `OR(email = '${email}', name = '${email}')`
}



class Likes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      userData  : []
    };
  }

  getUserFavs(){
    data.getAirtableRecords(table, options)
      .then( async (users) => {
        //USERS SHOULD BE ONLY ONE,THE ONLY THAT MATCH WITH EMAIL
        const user = users[0].fields;
        const hydratedUserWithLikes = [];
        //REPLACE LIKES ID's WITH ALL THE CONTENT
        hydratedUserWithLikes.push(await recommendation.hydrateUserLikes(user));

        this.setState({
          isLoading: false,
          userData: user,
          renderItems: user.likes
        });
        //console.log(this.state.userData.likes)
        return;
      })
  }


  componentDidMount() {
    this.getUserFavs()
  }


  render() {

    return (
    <div className="app_wrapper profile_view">

      <Header />
      <div className="global">
        <div className="container">
          <div className="ArticlesGrid mt-l">
            <BlockTitle title={'Likes'}/>

            <div className="container">
              <div className="mt-s">
                  {this.state.isLoading ? <LoadingSpinner /> : this.state.renderItems.map((records) =>
                    <FavItem {...records} key={records.id} itemId={records.id} />
                  )}
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
