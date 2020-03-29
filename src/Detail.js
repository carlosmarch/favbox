import React, { Component } from 'react';

import * as Helpers from './Helpers';

import Card from './components/Card';
import BlockTitle from './components/BlockTitle';
import LoadingSpinner from './components/LoadingSpinner';

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      recommendations: [],
      category: Helpers.getUrlCategory(),
      topic: Helpers.getUrlTopic(),
    };
  }

  componentDidMount() {
    fetch(window.$api+'&filterByFormula=Find(%22'+this.state.topic+'%22%2C+'+this.state.category+')')
    .then((resp) => resp.json())
    .then(data => {
      //console.log(data);
      //this.setState({recommendations: data.records});
      window.$pagedata = data.records;
      return fetch(window.$api)
    })
    .then((resp2) => resp2.json())
    .then(datafull => {
      //console.log(datafull);
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
        isLoading: false,
        recommendations: window.$pagedata.sort(() => Math.random() - 0.5),
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
        isLoading: true,
        category: Helpers.getUrlCategory(),
        topic : Helpers.getUrlTopic()
      }, () => {
        //Render again
        this.componentDidMount()
      });
    }
  }

  //Get contributor data by contributor ID "rec9p8GxW7FJxPtg5" "recbofdaqGgFjL20L"
  getContributor(contributorIdArray){
    const contributorId = contributorIdArray && contributorIdArray[0];
    return this.state.contributors?.filter(contributor => contributor.id?.indexOf(contributorId) !== -1);
  }

  render() {
    window.scrollTo(0, 0);
    return (

        <div className="global">
          <main>

            <div id="GridCard">
              <BlockTitle title={this.state.category==='categorias' ? this.state.topic+'s' : this.state.topic} description={'Las recomendaciones de '+this.state.topic+' mas destacadas'} titleclass="big-title mt-s" descriptionclass="big-description mb-m"/>
              <div className="container container-xl">
                  <div className="grid-card">

                    {this.state.isLoading ? <LoadingSpinner /> : this.state.recommendations?.map((records, key) =>
                      <Card {...records.fields} key={key} autor={this.getContributor(records.fields.contribuidor)}/>
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
