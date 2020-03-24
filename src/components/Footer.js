import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="rotating-wrapper">
          <img src={process.env.PUBLIC_URL + '/img/text.svg'} className="rotating-text rotating" alt="Mequedoencasa"/>
        </div>
        <div className="container">
                <div className="footnote">Gracias a Joan Miró por la inspiración. Y a un buen puñado de productos digitales excelentes
                  <br/>
                  <a href="https://vsco.co/">Vsco</a>,
                  <a href="https://stripe.com/">Stripe</a>,
                  <a href="https://www.mapbox.com/">Mapbox</a>,
                  <a href="https://www.intercom.com/">Intercom</a>,
                  <a href="https://www.typeform.com/">Typeform</a>,
                  <a href="https://www.notion.so/">Notion</a>,
                  <a href="https://www.shopify.com/">Shopify</a>,
                  <a href="https://www.eventbrite.es/">Eventbrite</a>,
                  <a href="https://airtable.com/">Airtable</a> &
                  <a href="https://es.reactjs.org/">React</a>
                  <br/>
                  que me han inspirado a programar y diseñar este proyecto.
                </div>
                <div className="divider"></div>
                <div className="footnote">©Hecho con cariño durante la cuarentena del COVID19. #yomequedoencasa v0.1</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
