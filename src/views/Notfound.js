import React, { Component } from "react";

import BlockTitle from '../components/BlockTitle';

class Notfound extends Component {
  render() {

    return (

      <div className="Notfound global">
        <BlockTitle title={'Notfound'} description={'No lo hemos esncontrado'}/>
        <div className="rotating-wrapper no@m">
          <img src={process.env.PUBLIC_URL + '/img/text.svg'} className="rotating-text rotating" alt="Mequedoencasa"/>
        </div>
      </div>

    );
  }
}

export default Notfound;
