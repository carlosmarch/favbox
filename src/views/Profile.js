import React, { Component } from "react";

import Header from '../components/Header';
import Footer from '../components/Footer';
import BlockTitle from '../components/BlockTitle';


//AIRTABLE HELPERS
const Airtable = require('airtable');
const data = require('../controllers/dataController.js');

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const table = base('contributors');
const options = {};


class Profile extends Component {

  componentDidMount() {
    data
      .getAirtableRecords(table, options)
      .then(users => {
        users.forEach(function(user) {
          //user.get('password')
          console.log(user)
        });
      })
      .catch(err => {
        console.log(Error(err));
      });
  }


  render() {

    return (
    <div className="app_wrapper profile_view">

      <Header />
      <div className="global">
        <div className="container">
          <BlockTitle title={'Profile'}/>
          <div className="AboutContent mt-s">
            {JSON.parse(localStorage.getItem('userSession'))?.name ? JSON.parse(localStorage.getItem('userSession'))?.name : 'None'}
          </div>
        </div>
      </div>

      <Footer/>

    </div>
    );
  }
}

export default Profile;
