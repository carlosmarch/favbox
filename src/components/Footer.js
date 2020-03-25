import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
                <div className="footnote">Gracias a Joan Miró por la inspiración. Y a un buen puñado de productos digitales excelentes
                  <br/>
                  <a href="https://vsco.co/" target="_blank" rel="noopener noreferrer">Vsco</a>,
                  <a href="https://stripe.com/" target="_blank" rel="noopener noreferrer">Stripe</a>,
                  <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer">Mapbox</a>,
                  <a href="https://www.intercom.com/" target="_blank" rel="noopener noreferrer">Intercom</a>,
                  <a href="https://www.typeform.com/" target="_blank" rel="noopener noreferrer">Typeform</a>,
                  <a href="https://www.notion.so/" target="_blank" rel="noopener noreferrer">Notion</a>,
                  <a href="https://www.shopify.com/" target="_blank" rel="noopener noreferrer">Shopify</a>,
                  <a href="https://www.eventbrite.es/" target="_blank" rel="noopener noreferrer">Eventbrite</a>,
                  <a href="https://airtable.com/" target="_blank" rel="noopener noreferrer">Airtable</a> &
                  <a href="https://es.reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>
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
