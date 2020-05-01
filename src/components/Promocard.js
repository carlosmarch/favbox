import React, { Component } from "react";

class Promocard extends Component {
  render() {


    return (

      <div className="Promo">
        <div className="container">
          <div className="Promocard grid">
              <div className="grid__item width-10/12 width-12/12@m">
                <div className="sticker">
                  <span className="letter">H</span>
                  <span className="letter">E</span>
                  <span className="letter">Y</span>
                  <span className="letter">!</span>
                </div>
                <h3 className="mt-xs">Tell the world what inspires you</h3>
                <p>We will find recommendations for you and you will be able share your favorite inspiration sources</p>
              </div>
              <div className="grid__item width-2/12 width-12/12@m">
                <a className="button" href="/signup">Get started!</a>
              </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Promocard;
