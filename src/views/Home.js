import React, { Component } from "react";
import { Link } from 'react-router-dom';

import HeaderMkt from '../components/HeaderMkt';
import Footer from '../components/Footer';

class Home extends Component {
  render() {

    return (
      <div className="app_wrapper home_view">

        <HeaderMkt />

        <div className="global">
          <div className="container">

            <div className="grid">
                  <div className="grid__item width-6/12 width-12/12@m">
                    <h1 className="main-title">The community platform for the <span className="scratch">future</span> people.</h1>
                    <p className="hero-text">We make it easy to find inspiration, references, and grow informed online communities that are built to last.</p>
                    <Link to="/feed" className="button">Discover</Link>
                  </div>
                  <div className="grid__item width-6/12 no@m">
                    <picture className="picture-main-image">
                      <img className="main-image" src="https://images.unsplash.com/photo-1446511437394-36cdff3ae1b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="cover"></img>
                    </picture>
                  </div>
            </div>

          </div>
        </div>

        <Footer/>

      </div>
    );
  }
}

export default Home;
