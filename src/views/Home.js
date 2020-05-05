import React, { Component } from "react";
import { Link } from 'react-router-dom';

import HeaderMkt from '../components/HeaderMkt';
import Footer from '../components/Footer';
import {ReactComponent as DiscoverIcon} from '../icons/Discover.svg';
import {ReactComponent as LikeIcon} from '../icons/Heart.svg';
import {ReactComponent as GlobeIcon} from '../icons/Globe.svg';
import Promocard from '../components/Promocard';

const userController = require('../controllers/userController.js');

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: userController.isAuthenticated()
    };
  }
  componentDidMount(){
    window.scrollTo(0, 0);
  }

  render() {

    return (
      <div className="app_wrapper home_view home-gold">

        <HeaderMkt />

        <div className="global">


          <section className="home-hero">
            <div className="container">

              <div className="grid">
                    <div className="grid__item width-6/12 width-12/12@m">
                      <Link to="/"><img className="logo mb-m no@dkt" src={process.env.PUBLIC_URL + '/logo.svg'} alt="logo"/></Link>
                      <h1 className="main-title">The sharing platform for the <span className="scratch no@m">quarantine</span> people.</h1>
                      <p className="hero-text">We make it easy to find inspiration, references, and grow informed online communities that are built to last.</p>

                    <div className="flex">
                        { this.state.isAuthenticated
                          ? <Link to="/create" className="button">Publish now!</Link>
                          : <Link to="/signup" className="button">Get Started!</Link>
                        }
                        <Link to="/feed" className="button button-outline ml-s">Discover</Link>
                      </div>

                    </div>
                    <div className="grid__item width-6/12 no@m">
                      <picture className="picture-main-image reveal">
                        <img className="main-image scale" src="https://images.unsplash.com/photo-1446511437394-36cdff3ae1b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="cover"></img>
                      </picture>
                    </div>
              </div>

            </div>
          </section>

          <section className="block bg-soft-grey">
            <div className="container">
                <div className="grid">
                    <div className="grid__item width-7/12 width-12/12@m">
                      <picture className="">
                        <img className="img-fit" src={process.env.PUBLIC_URL + '/img/hero-img.png'} alt="international person"/>
                      </picture>
                    </div>
                    <div className="grid__item width-5/12 width-12/12@m v-center">
                      <h2 className="alt-font">Let people know what inspires you.</h2>
                      <p className="hero-text">Share your collection of favourite resources to inspire. Don´t know what to read or watch? Find and save your next book or movie.</p>
                    </div>
                </div>
            </div>
          </section>

          <section className="bg-soft-grey">
            <div className="container">
                <div className="grid">
                    <div className="grid__item width-4/12 width-12/12@m">
                      <h5 className="mb-xs alt-font"><LikeIcon className="icon-primary icon-20"/> Curate</h5>
                      <p className="hero-text">Save & share your collection of favourite resources to inspire.</p>
                    </div>
                    <div className="grid__item width-4/12 width-12/12@m">
                      <h5 className="mb-xs alt-font"><DiscoverIcon className="icon-primary icon-20"/> Discover</h5>
                      <p className="hero-text">A place to discover new perspectives and share your own.</p>
                    </div>
                    <div className="grid__item width-4/12 width-12/12@m">
                      <h5 className="mb-xs alt-font"><GlobeIcon className="icon-primary icon-20"/> Connect</h5>
                      <p className="hero-text">Freedom from follower counts, communities, and ads.</p>
                    </div>
                </div>
            </div>
          </section>


          <section className="block bg-soft-grey">
            <div className="container">
                <div className="grid">
                    <div className="grid__item width-5/12 width-12/12@m v-center">
                      <h2 className="alt-font">Let people inspire you.</h2>
                      <p className="hero-text">Imagine to know what your industry leaders are reading or watching? Now it's possible.</p>
                    </div>
                    <div className="grid__item width-6/12 width-12/12@m">
                      <picture className="">
                        <img className="img-fit" src={process.env.PUBLIC_URL + '/img/hero-img-girl.png'} alt="international person"/>
                      </picture>
                    </div>
                </div>
            </div>
          </section>


          <section className="block bg-soft-grey no@m">
            <Promocard />
          </section>


        </div>

        <Footer/>

      </div>
    );
  }
}

export default Home;
