import React, { Component } from "react";

import BlockTitle from './components/BlockTitle';

class About extends Component {
  render() {

    return (
      <div className="global">
        <BlockTitle title={'About'} description={'Esto es el about'}/>
      </div>
    );
  }
}

export default About;
