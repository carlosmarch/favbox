import React, { Component } from "react";

import Card from './Card';
import BlockTitle from './BlockTitle';

class GridCard extends Component {


  constructor(props) {
    super(props);
    this.state = {
      readings: [],
    };
  }

  componentDidMount() {
    fetch('https://api.airtable.com/v0/appOyoqCMxKWB0IG8/readings?api_key=keyu0nFPUS8ZCnRmb')
    .then((resp) => resp.json())
    .then(data => {
      console.log(data);
      this.setState({ readings: data.records });
    }).catch(err => {
      // Error
    });
  }


  render() {

    return (

      <div id="GridCard">

        <BlockTitle title={'Destacados'} description={'Las recomendaciones mas destacadas'}/>

        <div className="grid-card">

          {this.state.readings.map(records =>
            <Card {...records.fields} />
          )}

          <img className="lines" src={process.env.PUBLIC_URL + '/img/lines.svg'}/>
        </div>

      </div>

    );
  }
}

export default GridCard;
