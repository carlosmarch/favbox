import React, { Component } from 'react';

import * as Helpers from './Helpers';

import Card from './components/Card';
import BlockTitle from './components/BlockTitle';

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recommendations: [],
      category: Helpers.getUrlCategory(),
      topic: Helpers.getUrlTopic(),
    };
  }

  componentDidMount() {
    fetch(window.$api+'&filterByFormula=Find(%22'+this.state.topic+'%22%2C+'+this.state.category+')')
    .then((resp) => resp.json())
    .then(data => {
      console.log(data);
      //this.setState({recommendations: data.records});
      window.$pagedata = data.records;
      return fetch(window.$api)
    })
    .then((resp2) => resp2.json())
    .then(datafull => {
      console.log(datafull);
      Helpers.storeUniqueTopics(datafull.records)
      Helpers.storeUniqueCategories(datafull.records)
      window.$alldata = datafull.records;
      return fetch(window.$api_contributors)
    })
    .then((resp3, data) => resp3.json())
    .then(contributors => {
      //ONCE WE HAVE ALL DATA FETCHED
      //THEN WE SETSTATE WHICH CAUSES RERENDER
      this.setState({
        recommendations: window.$pagedata,
        contributors: contributors.records}
      );
      //console.log('allcontributors',contributors.records)
      //console.log('contributors',this.state.contributors)
      //console.log('recommendations',this.state.recommendations)

    })
    .catch(err => {
      // Error
    });
  }

  componentDidUpdate(prevProps) {
    //If prev url is not the same render again
    if ( ( Helpers.getUrlTopic() !== prevProps.match.params.id )  || (  Helpers.getUrlCategory() !== prevProps.match.url.split("/")[1])  ) {
      // SET CLICKED NEW URL
      this.setState({
        category: Helpers.getUrlCategory(),
        topic : Helpers.getUrlTopic()
      }, () => {
        //Render again
        this.componentDidMount()
      });
    }
  }

  getAutordata(item){
    const itemid = item[0];
    return this.state.contributors.filter(contributor => contributor.id.indexOf(itemid) !== -1);
  }

  render() {
    return (

        <div className="global">
          <main>

            <div id="GridCard">
              <BlockTitle title={this.state.category==='categorias' ? this.state.topic+'s' : this.state.topic} description={'Las recomendaciones de '+this.state.topic+' mas destacadas'}/>
              <div className="container container-xl">
                  <div className="grid-card">

                    {this.state.recommendations.map((records, key) =>
                      <Card {...records.fields} key={key} autor={this.getAutordata(records.fields.autor)}/>
                    )}

                    <img className="lines" src={process.env.PUBLIC_URL + '/img/lines.svg'} alt="lines"/>
                  </div>
              </div>
            </div>

          </main>

        </div>
    );
  }
}

export default Detail;
