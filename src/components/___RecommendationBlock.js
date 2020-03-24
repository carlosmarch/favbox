import React, { Component } from 'react';

import Card from './Card';
import BlockTitle from './BlockTitle';

//WAITING FOR this.props.coleccion
//console.log('coleccion', this.props.coleccion)
var coleccionrecommendations

class RecommendationBlock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recommendations: [],
      contributors:[]
    };
  }

  componentDidMount() {
    fetch(window.$api+'&filterByFormula=Find(%22'+this.props.coleccion+'%22%2C+coleccion)')
    .then((resp) => resp.json())
    .then(data => {
      //console.log('coleccionrecommendations',data.records)
      coleccionrecommendations = data.records;
      return fetch(window.$api_contributors)
    })
    .then((resp2, data) => resp2.json())
    .then(contributors => {
      //console.log('allcontributors',contributors.records)
      this.setState({
        recommendations: coleccionrecommendations,
        contributors: contributors.records}
      );

    })
    .catch(err => {
      // Error
    });
  }

  //Get autor data by autor ID "rec9p8GxW7FJxPtg5" "recbofdaqGgFjL20L"
  getAutordata(item){
    const itemid = item[0];
    //console.log('getItemInfo RETURNS', this.state.contributors.filter(item => item.id.indexOf(itemid) !== -1) );
    return this.state.contributors.filter(contributor => contributor.id.indexOf(itemid) !== -1);
  }

  render() {
    console.log('coleccion', this.props.coleccion)
    return (

        <div id="GridCard" className="mt-l row-styler">
          <BlockTitle title={this.props.coleccion} />
          <div className="grid-card">

            {this.state.recommendations.map((records) =>
              <Card {...records.fields} key={records.id} autor={this.getAutordata(records.fields.autor)}/>
            )}

            <img className="lines" src={process.env.PUBLIC_URL + '/img/lines.svg'} alt="lines"/>
          </div>
        </div>

    );
  }
}

export default RecommendationBlock;
