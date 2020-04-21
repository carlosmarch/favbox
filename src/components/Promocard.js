import React, { Component } from "react";

class Promocard extends Component {
  render() {


    return (

      <div className="Promo mt-l no@m">
        <div className="container">
          <div className="Promocard grid mt-xl">
              <div className="grid__item width-10/12 width-12/12@m">
                <div className="sticker">
                  <span className="letter">H</span>
                  <span className="letter">E</span>
                  <span className="letter">Y</span>
                  <span className="letter">!</span>
                </div>
                <h3>Tell us what you like</h3>
                <p>We will find recommendations for you and you can share your favorite inspiration sources.</p>
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
