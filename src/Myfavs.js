import React, { Component } from 'react';

import * as Helpers from './Helpers';

import Card from './components/Card';
import BlockTitle from './components/BlockTitle';
import LoadingSpinner from './components/LoadingSpinner';
import Musiccard from './components/Musiccard';
import Podcastcard from './components/Podcastcard';
import Articlelist from './components/Articlelist';
import Videocard from './components/Videocard';
import Empty from './components/Empty';


const catTemplate = {
  card: ['libro', 'revista', 'película', 'serie'],
  musiccard: ['música'],
  podcastcard : ['podcast'],
  articlelist : ['artículo', 'web', 'newsletter'],
  videocard: ['video']
};

class Myfavs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      recommendations: [],
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
        recommendations: this.getFavItems(window.$alldata, Helpers.getFavs()),
        contributors: contributors.records,
        category: Helpers.getUrlCategory(),
        topic: Helpers.getUrlTopic()
        }
      );
      //console.log('allcontributors',contributors.records)
      //console.log('contributors',this.state.contributors)
      //console.log('recommendations',this.state.recommendations)
      //console.log( 'favs', Helpers.getFavs(), this.getFavItems(Helpers.getFavs()) )

    })
    .catch(err => {
      // Error
    });
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
  getUniqueCategories(data){
    let categories = data.map(function(item) {return item.fields.categorias})
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

  //From unique categories match only the ones from template array
  matchCategoriesWithTemplates(catArr){
    return this.getUniqueCategories(this.state.recommendations).filter(matchBlockCat => catArr.includes(matchBlockCat))
  }

  //Get all items which includes id in fav storage array
  getFavItems(records, favArr){
    return records.filter(recommendation => favArr.some(favId => recommendation.id === favId));
  }


  render() {
    window.scrollTo(0, 0);



    return (

        <div className="global">
          <main>
            <div id="Favoritos" className={`pb-xl ${"is-" + this.state.category}`}>

                    <BlockTitle title={this.state.recommendations && !this.state.recommendations.length ? '' : 'Favoritos'} titleclass="big-title mt-s mb-s" descriptionclass="big-description mb-m"/>

                    {this.state.isLoading ? <LoadingSpinner /> : this.matchCategoriesWithTemplates(catTemplate.card) && this.matchCategoriesWithTemplates(catTemplate.card).length ? (
                      this.renderCardItems(catTemplate.card)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(catTemplate.musiccard) && this.matchCategoriesWithTemplates(catTemplate.musiccard).length ? (
                      this.renderMusicItems(catTemplate.musiccard)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(catTemplate.podcastcard) && this.matchCategoriesWithTemplates(catTemplate.podcastcard).length ? (
                      this.renderPodcastItems(catTemplate.podcastcard)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(catTemplate.videocard) && this.matchCategoriesWithTemplates(catTemplate.videocard).length ? (
                      this.renderVideoItems(catTemplate.videocard)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(catTemplate.articlelist) && this.matchCategoriesWithTemplates(catTemplate.articlelist).length ? (
                      this.renderArticleItems(catTemplate.articlelist)
                    ) : ('')}

                    {!this.state.isLoading && this.state.recommendations && !this.state.recommendations.length ? <Empty/> : '' }

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
      <div className="GridCard mt-s">
          <div className="container">
              <h3 className="title-divider">Libros y revistas</h3>
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
        <div className="container">
            <h3 className="title-divider">Música</h3>
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
          <h3 className="title-divider">Podcasts</h3>
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
          <h3 className="title-divider">Artículos, webs, newsletters...</h3>
          <div className="">
              {this.getBlockCategoryItems(catArray).map((records) =>
                <Articlelist {...records.fields} key={records.id} itemId={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
              )}
          </div>
        </div>
      </div>
    )
  }

  renderVideoItems(catArray){
    return(
      <div className="ArticlesGrid mt-l">
        <div className="container">
          <h3 className="title-divider">Videos</h3>
          <div className="grid">
              {this.getBlockCategoryItems(catArray).map((records) =>
                <Videocard {...records.fields} key={records.id} itemId={records.id} autor={this.getContributor(records.fields.contribuidor)}/>
              )}
          </div>
        </div>
      </div>
    )
  }



}

export default Myfavs;
