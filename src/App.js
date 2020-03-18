import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Hero from './components/Hero';
import Card from './components/Card';
import BlockTitle from './components/BlockTitle';
import Dropdown from './components/Dropdown';

const api = 'https://api.airtable.com/v0/appOyoqCMxKWB0IG8/readings?api_key=keyu0nFPUS8ZCnRmb';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      readings: [],
      topics:[],
      categories:[]
    };
  }

  componentDidMount() {
    fetch(api)
    .then((resp) => resp.json())
    .then(data => {

      this.setState({ readings: data.records });

      //unique topics
      var topics = data.records.map(function(item) {return item.fields.temas;})
      const mergeAllTopics = Array.prototype.concat.apply([], topics);
      const uniqueTopics = mergeAllTopics.filter((val,id,array) => array.indexOf(val) === id);
      this.setState({ topics: uniqueTopics });

      //unique categories
      var categories = data.records.map(function(item) {return item.fields.categorias;})
      const mergeAllCategories = Array.prototype.concat.apply([], categories);
      const uniqueCategories = mergeAllCategories.filter((val,id,array) => array.indexOf(val) === id);
      this.setState({ categories: uniqueCategories });

      console.log(this.state.readings);
      //console.log(this.state.topics);
      //console.log(this.state.categories);

    }).catch(err => {
      // Error
    });
  }


  render() {
    return (

        <div className="global">
          <Hero />
          <main>

            <div id="GridCard">
              <BlockTitle title={'Destacados'} description={'Las recomendaciones mas destacadas'}/>
              <div className="grid-card">

                {this.state.readings.map((records) =>
                  <Card {...records.fields} key={records.id}/>
                )}

                <img className="lines" src={process.env.PUBLIC_URL + '/img/lines.svg'} alt="lines"/>
              </div>
            </div>

          </main>

          <Dropdown item={this.state.topics} type="temas"/>
          <Dropdown item={this.state.categories} type="categorias"/>
          
        </div>
    );
  }
}

export default App;
