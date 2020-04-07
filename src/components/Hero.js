import React, { Component } from "react";

class Hero extends Component {
  render() {

    return (
        <div className="hero-section no@m">
          <div className="bg-styled">
            <img src={process.env.PUBLIC_URL + '/img/line.svg'} className="" alt="lines"/>
          </div>

          <div className="container">
                <div className="grid">
                      <div className="grid__item width-6/12 width-12/12@m">
                        <h1 className="hero-title">Me quedo <br></br>en casa</h1>
                        <p className="hero-text">Hey my friend!! Aquí tienes un montón de recomendaciones seleccionadas de forma colaborativa para pasar estos días de encierro de una forma más llevadera.</p>
                        <a className="arrow" href="/#">Empieza ahora</a>
                      </div>
                      <div className="grid__item width-6/12 no@m">
                        <div className="col-xs-12 col-md-6 col-md-offset-1 image-container">
                                <div className="image-column">
                                  <img className="image-1" src={process.env.PUBLIC_URL + '/img/cover-1.jpg'} alt="international person"/>
                                  <img className="image-2" src={process.env.PUBLIC_URL + '/img/cover-2.jpg'} alt="international person"/>
                                  <img className="image-3" src={process.env.PUBLIC_URL + '/img/cover-3.png'} alt="international person"/>
                                  <img className="image-4" src={process.env.PUBLIC_URL + '/img/cover-4.jpg'} alt="international person"/>
                                </div>
                                <div className="image-column">
                                  <img className="image-1" src={process.env.PUBLIC_URL + '/img/cover-7.jpg'} alt="international person"/>
                                  <img className="image-2" src={process.env.PUBLIC_URL + '/img/cover-8.png'} alt="international person"/>
                                  <img className="image-3" src={process.env.PUBLIC_URL + '/img/cover-9.png'} alt="international person"/>
                                </div><div className="image-column">
                                  <img className="image-1" src={process.env.PUBLIC_URL + '/img/cover-1.jpg'} alt="international person"/>
                                  <img className="image-2" src={process.env.PUBLIC_URL + '/img/cover-2.jpg'} alt="international person"/>
                                  <img className="image-3" src={process.env.PUBLIC_URL + '/img/cover-3.png'} alt="international person"/>
                                  <img className="image-4" src={process.env.PUBLIC_URL + '/img/cover-4.jpg'} alt="international person"/>
                                  <img className="image-5" src={process.env.PUBLIC_URL + '/img/cover-5.jpg'} alt="international person"/>
                                  <img className="image-6" src={process.env.PUBLIC_URL + '/img/cover-6.jpg'} alt="international person"/>
                                  <img className="image-7" src={process.env.PUBLIC_URL + '/img/cover-7.jpg'} alt="international person"/>
                                  <img className="image-8" src={process.env.PUBLIC_URL + '/img/cover-8.png'} alt="international person"/>
                                </div>
                                <div className="image-column">
                                  <img className="image-1" src={process.env.PUBLIC_URL + '/img/cover-1.jpg'} alt="international person"/>
                                  <img className="image-2" src={process.env.PUBLIC_URL + '/img/cover-2.jpg'} alt="international person"/>
                                  <img className="image-3" src={process.env.PUBLIC_URL + '/img/cover-3.png'} alt="international person"/>
                                  <img className="image-4" src={process.env.PUBLIC_URL + '/img/cover-4.jpg'} alt="international person"/>
                                </div>
                                <div className="image-column">
                                  <img className="image-1" src={process.env.PUBLIC_URL + '/img/cover-6.jpg'} alt="international person"/>
                                  <img className="image-2" src={process.env.PUBLIC_URL + '/img/cover-7.jpg'} alt="international person"/>
                                  <img className="image-3" src={process.env.PUBLIC_URL + '/img/cover-8.png'} alt="international person"/>
                                </div>
                        </div>
                      </div>
              </div>
        </div>
      </div>

    );
  }
}

export default Hero;
