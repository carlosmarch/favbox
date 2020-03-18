import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Hero from './components/Hero';
import Card from './components/Card';
import BlockTitle from './components/BlockTitle';
import Dropdown from './components/Dropdown';

class Category extends Component {

  constructor(props) {
    super(props);
    this.url = {};
    this.url.urlType = decodeURIComponent(window.location.pathname.split("/")[1]);
    this.url.urlDetail = decodeURIComponent(window.location.pathname.split("/").pop());
    //const maxrecords = '&maxRecords=5';

    this.url = {
      urlType: '',
      urlDetail: '',
      api: ['https://api.airtable.com/v0/appOyoqCMxKWB0IG8/readings?api_key=keyu0nFPUS8ZCnRmb&filterByFormula=Find(%22'+this.url.urlDetail+'%22%2C+'+this.url.urlType+')']
    };

    this.url.urlType = decodeURIComponent(window.location.pathname.split("/")[1]);
    this.url.urlDetail = decodeURIComponent(window.location.pathname.split("/").pop());



    this.state = {
      readings: [],
    };

    //Here ya go
    this.props.history.listen((location, action) => {
      console.log("on route change");
    });

  }

  componentDidMount() {
    fetch(this.url.api)
    .then((resp) => resp.json())
    .then(data => {

      this.setState({ readings: data.records });

    }).catch(err => {
      // Error
    });
  }

  render() {
    return (

        <div className="global">
          <main>

            <div id="GridCard">
              <BlockTitle title={this.url.urlType==='categorias' ? this.url.urlDetail+'s' : this.url.urlDetail} description={'Las recomendaciones de '+this.url.urlDetail+' mas destacadas'}/>
              <div className="grid-card">

                {this.state.readings.map((records, key) =>
                  <Card {...records.fields} key={key}/>
                )}

                <img className="lines" src={process.env.PUBLIC_URL + '/img/lines.svg'} alt="lines"/>
              </div>
            </div>

          </main>

        </div>
    );
  }
}

export default Category;
