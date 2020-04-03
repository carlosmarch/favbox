import React, { Component } from "react";

import Button from './Button';

class Promocard extends Component {
  render() {


    return (

      <div className="Invite mt-l">
        <div className="container">
          <div className="Promocard grid mt-xl">
              <div className="grid__item width-10/12 width-12/12@m">
                <div className="sticker">
                  <span className="letter">H</span>
                  <span className="letter">E</span>
                  <span className="letter">Y</span>
                  <span className="letter">!</span>
                </div>
                <h3>Cuéntanos qué te gusta</h3>
                <p>Encontraremos recomendaciones para tí y podrás compartir tus pasatiempos preferidos.</p>
              </div>
              <div className="grid__item width-2/12 width-12/12@m">
                <Button text="Empezar!" />
              </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Promocard;
