import React, { Component } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlockTitle from '../components/BlockTitle';

class Notfound extends Component {
  render() {

    return (
      <div className="app_wrapper notfound_view">
        <Header />
        <div className="global">
          <div className="Notfound global">
            <BlockTitle title={'This page is lost'} description={'We searched high and low but couldn’t find what you’re looking for. Let’s find a better place for you to go.'}/>
          </div>
        </div>
        <Footer/>
      </div>

    );
  }
}

export default Notfound;
