import React, { Component } from "react";

import BlockTitle from './components/BlockTitle';

class About extends Component {
  render() {

    return (
      <div className="global">
        <div className="container container-s">
          <BlockTitle title={'About'} description={'Esto es el about'}/>
          <div className="AboutContent mt-s">
            <p>El proyecto empieza durante la cuarentena de marzo por el COVID-19. </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
