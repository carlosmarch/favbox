import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Recommendations from './Recommendations';

import Button from './components/Button';
import Footer from './components/Footer';
import Header from './components/Header';
import Block from './components/Hero';
import Card from './components/Card';
import BlockTitle from './components/BlockTitle';



class App extends Component {

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

      <BrowserRouter>
        <div className="global">
          <Header />
          <Block />

          <main>
            <BlockTitle title={'Destacados'} description={'Las recomendaciones mas destacadas'}/>


            <div className="card-grid">

              {this.state.readings.map(records =>
                <Card {...records.fields} />
              )}

              <img className="lines" src={process.env.PUBLIC_URL + '/img/lines.svg'}/>
            </div>

          </main>

          <Route path="/recommendations" component={Recommendations} />

          <Footer />

        </div>

      </BrowserRouter>

    );
  }
}

export default App;
