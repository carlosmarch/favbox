import React, { Component } from "react";

class Home extends Component {
  render() {

    return (
      <div className="global home">
        <div className="container">

          <div className="grid">
                <div className="grid__item width-6/12 width-12/12@m">
                  <h1 className="main-title">The community platform for the people.</h1>
                  <p className="hero-text">We make it easy to find inspiration, and grow safe, successful online communities that are built to last.</p>
                  <button class="button">Start</button>
                </div>
                <div className="grid__item width-6/12 no@m">
                  <picture className="picture-main-image">
                    <img className="main-image" src="https://images.unsplash.com/photo-1446511437394-36cdff3ae1b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"></img>
                  </picture>
                </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Home;
