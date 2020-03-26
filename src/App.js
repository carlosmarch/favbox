import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as Helpers from './Helpers';

import Hero from './components/Hero';
import BlockTitle from './components/BlockTitle';
import Card from './components/Card';
import Musiccard from './components/Musiccard';
import Collectioncard from './components/Collectioncard';
import Promocard from './components/Promocard';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      recommendations: [],
      contributors: [],
    };
  }




  componentDidMount() {
    fetch(window.$api)
    .then((resp) => resp.json())
    .then(data => {
      //console.log('allrecords',data.records)
      //PREVENT RERENDER WITH setState
      //STORE GLOBALLY & THEN SET ALL DATA
      //this.setState({ recommendations: data.records }); //PREVENT RERENDER
      Helpers.storeUniqueTopics(data.records)
      Helpers.storeUniqueCategories(data.records)
      window.$alldata = data.records;

      return fetch(window.$api_contributors)

    })
    .then((resp2, data) => resp2.json())
    .then(contributors => {
      //console.log('allcontributors',contributors.records)
      this.setState({
        isLoading: false,
        recommendations: window.$alldata,
        contributors: contributors.records}
      );

      //console.log('contributors',this.state.contributors)
      //console.log('recommendations',this.state.recommendations)

    })
    .catch(err => {
      // Error
    });
  }




  //Get contributor data by contributor ID "rec9p8GxW7FJxPtg5" "recbofdaqGgFjL20L"
  getContributor(contributorIdArray){
    const contributorId = contributorIdArray && contributorIdArray[0];
    return this.state.contributors.filter(contributor => contributor.id.indexOf(contributorId) !== -1);
  }


  //RETURN FILTERED ITEMS
  returnTopicItems(topicName, size){
    const topicItems = [];
    this.state.recommendations.filter(recommendation => recommendation.fields.temas?.includes(topicName)).map(filteredTopicItem => (
        topicItems.push(filteredTopicItem)
   ));
   return topicItems.slice(0, size)
  }

  returnCategoryItems(categoryName, size){
    return this.state.recommendations.filter(recommendation => recommendation.fields.categorias?.includes(categoryName)).slice(0, size)
  }

  returnCollectionItems(collectionName, size){
    const collections = [];
    this.state.recommendations.filter(recommendation => recommendation.fields.colecciones?.includes(collectionName)).map(filteredCollectionItem => (
        collections.push(filteredCollectionItem)
   ));
   return collections.slice(0, size)
  }


  render() {

          return (

              <div className="global">

                <Hero />

                <main>

                    <div id="GridCard">
                      <BlockTitle title={'Libros'} description={'Las recomendaciones mas destacadas'}/>
                      <div className="container container-xl">
                          <div className="grid-card">
                            {this.returnCategoryItems('libro', 8).map((records) =>
                              <Card {...records.fields} key={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
                            )}
                          </div>
                      </div>
                    </div>




                    <div className="MusicGrid">
                      <div className="container">
                        <BlockTitle title={'Música'} description={'Las recomendaciones mas destacadas'}/>
                        <div className=" grid mt-s">
                            {this.returnCategoryItems('música', 8).map((records) =>
                              <Musiccard {...records.fields} key={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
                            )}
                          </div>
                      </div>
                    </div>




                    <div id="GridCard">
                      <BlockTitle title={'Revistas'} description={'Las recomendaciones mas destacadas'}/>
                      <div className="container container-xl">
                          <div className="grid-card">
                            {this.returnCategoryItems('revista', 4).map((records) =>
                              <Card {...records.fields} key={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
                            )}
                            <img className="lines" src={process.env.PUBLIC_URL + '/img/dot-3.svg'} alt="lines"/>
                          </div>
                      </div>
                    </div>





                    <div className="GridColection mt-l">
                      <BlockTitle title={'Colecciones'} description={'Las recomendaciones mas destacadas'}/>
                      <div className="container">
                        <div className=" grid mt-s">
                            <Collectioncard title={'darle al coco'} grid={'width-4/12'} number={this.returnCollectionItems('darle al coco').length}/>
                            <Collectioncard title={'mantenerse en forma'} grid={'width-4/12'}/>
                            <Collectioncard title={'pandemias, contagios y visionarios'} grid={'width-4/12'}/>
                            <Collectioncard title={'aprender'} grid={'width-6/12'}/>
                            <Collectioncard title={'disfrutar de algo'} grid={'width-6/12'}/>
                        </div>
                      </div>
                    </div>


                    <Promocard />


                    <div className="TopicCollection mt-l">
                      <div className="container container-s">
                        <div className=" grid mt-s">
                          {window.$topics && window.$topics.filter(function(e){return e}).map((temas, key) =>
                              <Link to={`/temas/${temas}`} key={key} className="topic-card width-3/12">{temas}</Link>
                          )}
                        </div>
                      </div>
                    </div>



                </main>
              </div>
          );//render

  }
}

export default App;
