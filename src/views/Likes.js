import React, { Component } from "react";

import * as Helpers from '../Helpers';

import Header from '../components/Header';
import Footer from '../components/Footer';
import BlockTitle from '../components/BlockTitle';
import FavItem from '../components/FavItem';
import LoadingSpinner from '../components/LoadingSpinner';

const recommendationController = require('../controllers/recommendationController.js');
const userController = require('../controllers/userController.js');

//AIRTABLE HELPERS
const Airtable = require('airtable');
const data = require('../controllers/dataController.js');
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
const table = base('contributors');



class Likes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      userData  : []
    };
  }

  getUserFavs(){

    const email = userController.getSession()?.email;
    const options = {
      filterByFormula: `OR(email = '${email}', name = '${email}')`
    }

    if (!email) {
      //WHEN NO SESSION && NO EMAIL
      this.setState({
        isLoading: false,
        renderItems: []
      });
     return
    }

    data.getAirtableRecords(table, options)
      .then( async (users) => {
        //USERS SHOULD BE ONLY ONE,THE ONLY THAT MATCH WITH EMAIL
        const user = users[0].fields;
        const hydratedUserWithLikes = [];
        //REPLACE LIKES ID's WITH ALL THE CONTENT
        hydratedUserWithLikes.push(await recommendationController.hydrateUserLikes(user));

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
                { this.state.isLoading
                    ? <LoadingSpinner />
                    : this.state.renderItems && this.state.renderItems.length > 0
                        ? this.state.renderItems.map( (records) => <FavItem {...records} key={records.id} itemId={records.id} /> )
                        : 'No items'
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
