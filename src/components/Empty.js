import React, { Component } from "react";

import BlockTitle from './BlockTitle';

class Empty extends Component {
  render() {

    return (

      <div className="Notfound Notfound-empty global">
        <BlockTitle title={'❤ Mis Favoritos'} description={'Dale al corazón para guardar los items que más te gusten'}/>
      </div>

    );
  }
}

export default Empty;
