import React, { Component } from "react";

class Hero extends Component {
  render() {

    return (
        <div className="hero-section">
          <div className="bg-styled">
            <img src={process.env.PUBLIC_URL + '/img/line.svg'} className="" alt="lines"/>
          </div>

          <div className="container">
                <div className="grid">
                      <div className="grid__item width-6/12">
                        <h1 className="">Me quedo en casa</h1>
                        <p className="hero">Crea rutas de preguntas personalizadas con un número ilimitado de <b>Saltos Lógicos.</b> Saluda a las personas por el nombre o segméntalas por canal con <b>Campos Ocultos.</b> Haz seguimiento de forma personalizada en <b>Hubspot</b> o <b>Mailchimp.</b> Y optimiza tus campañas de marketing con <b>Google Tag Manager</b> o <b>Facebook pixel.</b></p>
                        <a className="arrow" href="https://airtable.com/tblPHqTD0CnmiWwAN/viwOPZ0TiEQRSWSc9">Empieza ahora</a>
                      </div>
                      <div className="grid__item width-6/12">
                      </div>
              </div>
        </div>
      </div>

    );
  }
}

export default Hero;
