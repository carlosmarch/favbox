import React, { Component } from "react";

import Header from '../components/Header';
import Footer from '../components/Footer';
import BlockTitle from '../components/BlockTitle';
import FavItem from '../components/FavItem';
import LoadingSpinner from '../components/LoadingSpinner';

//AIRTABLE HELPERS
const Airtable = require('airtable');
const data = require('../controllers/dataController.js');
const user = require('../controllers/userController.js');
const recommendation = require('../controllers/recommendationController.js');

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const table = base('contributors');
const options = {};


class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userData:[],
      likes: [],
    };
  }

  componentDidMount() {
    const email = JSON.parse(localStorage.getItem('userSession'))?.email
    const options = {
      filterByFormula: `OR(email = '${email}', name = '${email}')`
    }

    data.getAirtableRecords(table, options)
      .then( async (users) => {
        //USERS SHOULD BE ONLY ONE THAT MATCH WITH EMAIL
        const user = users[0].fields
        const hydratedUser = [];
        //REPLACE LIKES ID's WITH ALL THE CONTENT
        hydratedUser.push(await recommendation.hydrateUserLikes(user));

        this.setState({
          isLoading: false,
          userData: user,
          likes: hydratedUser[0].likes
        });
        //console.log(this.state.likes)

      })
      .catch(err => {
        console.log( Error(err));
      });

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
                  {this.state.isLoading ? <LoadingSpinner /> : this.state.likes.map((records) =>
                    <FavItem {...records} key={records.id} itemId={records.id} autor={this.state.userData}/>
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

export default Profile;
