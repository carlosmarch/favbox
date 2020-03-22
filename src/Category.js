import React, { Component } from 'react';

import * as Helpers from './Helpers';

import Cardcategory from './components/Cardcategory';
import BlockTitle from './components/BlockTitle';

class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recommendations: [],
      category: Helpers.getUrlCategory(),
      topic: Helpers.getUrlTopic(),
    };
  }

  componentDidMount() {
    fetch(window.$api+'&fields%5B%5D='+this.state.category+'')
    .then((resp) => resp.json())
    .then(data => {
      //Check if categorias or temas and get unique ones
      let uniquerecords;
      if (this.state.category === 'categorias'){
          uniquerecords = Helpers.storeUniqueCategories(data.records)
      }else {
          uniquerecords = Helpers.storeUniqueTopics(data.records)
      }
      this.setState({recommendations: uniquerecords});
    })
    .catch(err => {
      // Error
    });
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps)
    //If prev url is not the same render again
    // if ( ( Helpers.getUrlCategory() !== prevProps.match.params.id )  || (  Helpers.getUrlCategory() !== prevProps.match.url.split("/")[1])  ) {
    //   // Point selected new url
    //   this.setState({
    //     category: Helpers.getUrlCategory(),
    //     topic : Helpers.getUrlTopic()
    //   }, () => {
    //     //Render again
    //     this.componentDidMount()
    //   });
    // }
  }


  render() {
    return (

      <div className="global">
        <main>

          <div id="GridCard">
            <BlockTitle title={this.state.category} description={'Las recomendaciones de '+this.state.category+' mas destacadas'}/>
            <div className="grid-card">

              {this.state.recommendations.map((record) =>
                <div>{record}</div>
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
