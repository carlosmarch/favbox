import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as Helpers from './Helpers';

import Hero from './components/Hero';
import BlockTitle from './components/BlockTitle';
import Card from './components/Card';
import Musiccard from './components/Musiccard';
import Podcastcard from './components/Podcastcard';
import Collectioncard from './components/Collectioncard';
import Promocard from './components/Promocard';
import Articlelist from './components/Articlelist';
import Videocard from './components/Videocard';
import LoadingSpinner from './components/LoadingSpinner';




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

      this.setState({
        isLoading: false,
        recommendations: window.$alldata.sort(() => Math.random() - 0.5),//random order
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



  //-------------------------//
  //  HELPERS
  //-------------------------//


  //Get contributor data by contributor ID "rec9p8GxW7FJxPtg5" "recbofdaqGgFjL20L"
  getContributor(contributorIdArray){
    const contributorId = contributorIdArray && contributorIdArray[0];
    return this.state.contributors.filter(contributor => contributor.id.indexOf(contributorId) !== -1);
  }


  //RETURN FILTERED ITEMS
  getTopicItems(topicName, size){
    const topicItems = [];
    this.state.recommendations.filter(recommendation => recommendation.fields.temas?.includes(topicName)).map(filteredTopicItem => (
        topicItems.push(filteredTopicItem)
   ));
   return topicItems.slice(0, size)
  }

  //Get items by category name
  getCategoryItems(categoryName, size){
    return this.state.recommendations.filter(recommendation => recommendation.fields.categorias?.includes(categoryName)).slice(0, size)
  }


  //Get items by collection name
  getCollectionItems(collectionName, size){
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

                    <div className="GridCard mb-l">
                        <BlockTitle title={'Libros'} description={'Las recomendaciones mas destacadas'} link={'categorias/libro'}/>
                        <div className="container container-xl">
                            <div className="grid">
                              {this.state.isLoading ? <LoadingSpinner /> : this.getCategoryItems('libro', 4).map((records) =>
                                <Card {...records.fields} key={records.id} itemId={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
                              )}
                            </div>
                        </div>
                    </div>




                    <div className="MusicGrid">
                        <BlockTitle title={'Música'} description={'Las recomendaciones mas destacadas'} link={'categorias/música'}/>
                        <div className="container">
                            <div className="grid mt-s">
                                {this.state.isLoading ? <LoadingSpinner /> : this.getCategoryItems('música', 6).map((records) =>
                                  <Musiccard {...records.fields} key={records.id} itemId={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
                                )}
                            </div>
                        </div>

                        <BlockTitle title={'Podcasts'} description={'Las recomendaciones mas destacadas'} link={'categorias/podcast'} titleclass="mt-l"/>
                        <div className="container">
                            <div className="grid mt-s">
                                {this.state.isLoading ? <LoadingSpinner /> : this.getCategoryItems('podcast', 8).map((records) =>
                                  <Podcastcard {...records.fields} key={records.id} itemId={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
                                )}
                            </div>
                        </div>
                    </div>




                    <div className="GridCard">
                        <BlockTitle title={'Revistas'} description={'Las recomendaciones mas destacadas'} link={'categorias/revista'}/>
                        <div className="container container-xl">
                          <div className="grid">
                              {this.state.isLoading ? <LoadingSpinner /> : this.getCategoryItems('revista', 4).map((records) =>
                                <Card {...records.fields} key={records.id} itemId={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
                              )}
                            <img className="lines" src={process.env.PUBLIC_URL + '/img/dot-3.svg'} alt="lines"/>
                          </div>
                        </div>
                    </div>


                    <div className="GridVideo mt-l">
                        <BlockTitle title={'Videos'} description={'Las recomendaciones mas destacadas'} link={'categorias/video'}/>
                        <div className="container container-xl">
                          <div className="grid">
                              {this.state.isLoading ? <LoadingSpinner /> : this.getCategoryItems('video', 4).map((records) =>
                                <Videocard {...records.fields} key={records.id} itemId={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
                              )}
                            <img className="lines" src={process.env.PUBLIC_URL + '/img/dot-2.svg'} alt="lines"/>
                          </div>
                        </div>
                    </div>




                    <div className="GridColection mt-l">
                        <BlockTitle title={'Colecciones'} description={'Las recomendaciones mas destacadas'}/>
                        <div className="container container-xl">
                          <div className=" grid mt-s">
                              <Collectioncard title={'darle al coco'} grid={'width-4/12'} number={this.getCollectionItems('darle al coco').length}/>
                              <Collectioncard title={'mantenerse en forma'} grid={'width-4/12'} number="0" />
                              <Collectioncard title={'pandemias, contagios y visionarios'} grid={'width-4/12'} number="0" />
                              <Collectioncard title={'aprender'} grid={'width-6/12'} number={this.getCollectionItems('aprender').length} />
                              <Collectioncard title={'futuros'} grid={'width-6/12'} number={this.getCollectionItems('futuros').length} />
                          </div>
                        </div>
                    </div>


                    <div className="ArticlesGrid">
                      <div className="container">
                        <BlockTitle
                          title={'Qué leer'}
                          description={'Artículos, newsletters y webs para entretenerse un rato navegando.'}
                          titleclass="big-title mt-xl" descriptionclass="big-description" link={'categorias/artículo'}/>
                        <div className="mt-l">
                            {this.state.isLoading ? <LoadingSpinner /> : this.getCategoryItems('artículo', 20).map((records) =>
                              <Articlelist {...records.fields} key={records.id} itemId={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
                            )}
                            {this.state.isLoading ? <LoadingSpinner /> : this.getCategoryItems('newsletter', 20).map((records) =>
                              <Articlelist {...records.fields} key={records.id} itemId={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
                            )}
                            {this.state.isLoading ? <LoadingSpinner /> : this.getCategoryItems('web', 20).map((records) =>
                              <Articlelist {...records.fields} key={records.id} itemId={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
                            )}
                        </div>
                      </div>
                    </div>


                    <Promocard />


                    <div className="TopicCollection mt-l">
                      <div className="container container-s">
                        <div className=" grid mt-s">
                          {window.$topics && window.$topics.map((temas, key) =>
                              <Link to={`/temas/${temas}`} key={key} className="topic-card width-3/12 width-6/12@m">{temas}</Link>
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
