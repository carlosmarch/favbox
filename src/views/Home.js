import React, { Component } from "react";
import { Link } from 'react-router-dom';

import HeaderMkt from '../components/HeaderMkt';
import Footer from '../components/Footer';

const userController = require('../controllers/userController.js');

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: userController.isAuthenticated()
    };
  }


  render() {

    return (
      <div className="app_wrapper home_view">

        <HeaderMkt />

        <div className="global">
          <div className="container">

            <div className="grid">
                  <div className="grid__item width-6/12 width-12/12@m">
                    <Link to="/"><img className="logo mb-m no@dkt" src={process.env.PUBLIC_URL + '/logo.svg'} alt="logo"/></Link>
                    <h1 className="main-title">The community platform for the <span className="scratch">future</span> people.</h1>
                    <p className="hero-text">We make it easy to find inspiration, references, and grow informed online communities that are built to last.</p>

                    { this.state.isAuthenticated
                      ? <Link to="/create" className="button">Publish now!</Link>
                      : <Link to="/signup" className="button">Get Started!</Link>
                    }

                  </div>
                  <div className="grid__item width-6/12 no@m">
                    <picture className="picture-main-image">
                      <img className="main-image" src="https://images.unsplash.com/photo-1446511437394-36cdff3ae1b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="cover"></img>
                    </picture>
                    <div className="bg-home"></div>
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
