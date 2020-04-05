import React, { Component } from 'react';

import * as Helpers from './Helpers';

import Card from './components/Card';
import BlockTitle from './components/BlockTitle';
import LoadingSpinner from './components/LoadingSpinner';
import Musiccard from './components/Musiccard';
import Podcastcard from './components/Podcastcard';
import Articlelist from './components/Articlelist';
import Notfound from './Notfound';


const catTemplate = {
  card: ['libro', 'revista', 'película', 'serie'],
  musiccard: ['música'],
  podcastcard : ['podcast'],
  articlelist : ['artículo', 'web', 'newsletter']
};


class Myfavs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      recommendations: [],
      category: Helpers.getUrlCategory(),
      topic: Helpers.getUrlTopic()
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



  componentDidUpdate(prevProps) {
    //If prev url is not the same render again
    if ( ( Helpers.getUrlTopic() !== prevProps.match.params.id )  || (  Helpers.getUrlCategory() !== prevProps.match.url.split("/")[1])  ) {
      // SET CLICKED NEW URL
      this.setState({
        isLoading: true,
        category: Helpers.getUrlCategory(),
        topic : Helpers.getUrlTopic()
      }, () => {
        //Call API && Render again when state (async) is done
        this.componentDidMount()
      });
    }
  }



  //-------------------------//
  //  HELPERS
  //-------------------------//


  //Get contributor data by contributor ID "rec9p8GxW7FJxPtg5"
  getContributor(contributorIdArray){
    const contributorId = contributorIdArray && contributorIdArray[0];
    return this.state.contributors?.filter(contributor => contributor.id?.indexOf(contributorId) !== -1);
  }


  //Get unique categories from page records
  getUniqueCategories(pagedata){
    let categories = pagedata.map(function(item) {return item.fields.categorias})
    let mergeAllCategories = Array.prototype.concat.apply([], categories);
    return mergeAllCategories.filter((val,id,array) => array.indexOf(val) === id);
  }


  //Get items by category name
  getCategoryItems(categoryName){
    return this.state.recommendations.filter(recommendation => recommendation.fields.categorias?.includes(categoryName));
  }

  //Get all items which includes any of categories in array
  getBlockCategoryItems(catArr){
    return this.state.recommendations.filter( (recommendation) => catArr.some((tag) => recommendation.fields.categorias.includes(tag)) );
  }

  matchCategoriesWithTemplates(catArr){
    return this.getUniqueCategories(this.state.recommendations).filter(matchBlockCat => catArr.includes(matchBlockCat))
  }


  getAllStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}



  render() {
    window.scrollTo(0, 0);



    return (

        <div className="global">
          <main>
            <div id="Detail" className={`pb-xl ${"is-" + this.state.category}`}>

                    {!this.state.isLoading && window.$pagedata.length === 0
                      ? <Notfound/>
                      : <BlockTitle title={this.state.topic} description={'Las recomendaciones de '+this.state.topic+' mas destacadas'} titleclass="big-title mt-s" descriptionclass="big-description mb-m"/>
                    }

                    {this.state.isLoading ? <LoadingSpinner /> : this.matchCategoriesWithTemplates(catTemplate.card) && this.matchCategoriesWithTemplates(catTemplate.card).length ? (
                      this.renderCardItems(catTemplate.card)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(catTemplate.musiccard) && this.matchCategoriesWithTemplates(catTemplate.musiccard).length ? (
                      this.renderMusicItems(catTemplate.musiccard)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(catTemplate.podcastcard) && this.matchCategoriesWithTemplates(catTemplate.podcastcard).length ? (
                      this.renderPodcastItems(catTemplate.podcastcard)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(catTemplate.articlelist) && this.matchCategoriesWithTemplates(catTemplate.articlelist).length ? (
                      this.renderArticleItems(catTemplate.articlelist)
                    ) : ('')}

              <img className="lines" src={process.env.PUBLIC_URL + '/img/lines.svg'} alt="lines"/>

            </div>

          </main>

        </div>
    );
  }//Render



  //-------------------------//
  //  TEMPLATES
  //-------------------------//

  renderCardItems(catArray) {
    return (
      <div className="GridCard">
          <div className="container container-xl">
              <div className="grid">
                {this.getBlockCategoryItems(catArray).map((records) =>
                  <Card {...records.fields} key={records.id} itemId={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
                )}
              </div>
          </div>
      </div>
    )
  }

  renderMusicItems(catArray) {
    return(
      <div className="MusicGrid-detail mt-l">
        <BlockTitle title={this.state.category==='categorias' ? '' : 'Música'} />
        <div className="container">
            <div className="grid">
                {this.getBlockCategoryItems(catArray).map((records) =>
                  <Musiccard {...records.fields} key={records.id} itemId={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
                )}
            </div>
        </div>
      </div>
    )
  }

  renderPodcastItems(catArray){
    return(
      <div className="PodcastGrid mt-l">
        <div className="container mt-l">
          <BlockTitle title={this.state.category==='categorias' ? '' : 'Para escuchar'} />
          <div className="grid">
              {this.getBlockCategoryItems(catArray).map((records) =>
                <Podcastcard {...records.fields} key={records.id} itemId={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
              )}
          </div>
        </div>
      </div>
    )
  }

  renderArticleItems(catArray){
    return(
      <div className="ArticlesGrid mt-l">
        <div className="container">
          <BlockTitle title={this.state.category==='categorias' ? '' : 'Más'}/>
          <div className="">
              {this.getBlockCategoryItems(catArray).map((records) =>
                <Articlelist {...records.fields} key={records.id} itemId={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
              )}
          </div>
        </div>
      </div>
    )
  }



}

export default Myfavs;
