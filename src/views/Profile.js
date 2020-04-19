import React, { Component } from "react";

import Header from '../components/Header';
import Footer from '../components/Footer';
import BlockTitle from '../components/BlockTitle';

class Profile extends Component {
  render() {

    return (
    <div className="app_wrapper profile_view">

      <Header />
      <div className="global">
        <div className="container">
          <BlockTitle title={'Profile'}/>
          <div className="AboutContent mt-s">
            {JSON.parse(localStorage.getItem('userSession')).name}
          </div>
        </div>
      </div>

      <Footer/>

    </div>
    );
  }
}

export default Profile;
