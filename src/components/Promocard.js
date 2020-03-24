import React, { Component } from "react";

import Button from './Button';

class Promocard extends Component {
  render() {


    return (

      <div className="Invite mt-l">
        <div className="container">
          <div className="Promocard grid mt-s">
              <div className="grid__item width-10/12">
                <h3>Cuéntanos que te gusta</h3>
                <p>Encontraremos recomendaciones para tí y podrás compartir tus pasatiempos preferidos.</p>
              </div>
              <div className="grid__item width-2/12">
                <Button text="Empezar!" />
              </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Promocard;
