import React, { Component } from "react";

import Card from './Card';
import BlockTitle from './BlockTitle';

const api = 'https://api.airtable.com/v0/appOyoqCMxKWB0IG8/readings?api_key=keyu0nFPUS8ZCnRmb';
const filter = '&filterByFormula=Find(%22design%22%2C+topics';
const maxrecords = '&maxRecords=5';

class GridCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      readings: [],
      topics:[]
    };

  }
  //&filterByFormula=Find(%22design%22%2C+topics
  componentDidMount() {
    fetch(api)
    .then((resp) => resp.json())
    .then(data => {

      this.setState({ readings: data.records });

      //unique topics
      var topics = data.records.map(function(item) {
        return item.fields.topics;
      })
      const mergeAllTopics = Array.prototype.concat.apply([], topics);
      const uniqueTopics = mergeAllTopics.filter((val,id,array) => array.indexOf(val) == id);
      this.setState({ topics: uniqueTopics });

      //console.log(this.state.readings);
      //console.log(this.state.topics);


    }).catch(err => {
      // Error
    });
  }


  render() {

    return (

      <div id="GridCard">

        <BlockTitle title={this.props.title} description={this.props.description}/>

        <div className="grid-card">

          {this.state.readings.map((records, key) =>

            <Card {...records.fields} key={key}/>
          )}

          <ul>
            {this.state.topics.map((topics, key) =>
              <li key={key}>{topics}</li>
            )}
          </ul>

          <img className="lines" src={process.env.PUBLIC_URL + '/img/lines.svg'} alt="lines"/>
        </div>

      </div>

    );
  }
}

export default GridCard;
