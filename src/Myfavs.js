import React, { Component } from 'react';

import * as Helpers from './Helpers';
import * as Templates from './templates/Templates';

import BlockTitle from './components/BlockTitle';
import LoadingSpinner from './components/LoadingSpinner';
import Empty from './components/Empty';


const catTemplate = {
  card:         ['libro', 'revista'],
  musiccard:    ['música'],
  podcastcard : ['podcast'],
  articlelist : ['artículo', 'web', 'newsletter'],
  videocard:    ['video'],
  appcard:      ['app'],
  cinemacard:   ['película', 'serie']
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
        recommendations: Helpers.getFavItems(window.$alldata),
        contributors: contributors.records,
        category: Helpers.getUrlCategory(),
        topic: Helpers.getUrlTopic()
        }
      );
      //console.log('allcontributors',contributors.records)
      //console.log('contributors',this.state.contributors)
      //console.log('recommendations',this.state.recommendations)
      //console.log( 'favs', Helpers.getFavs(), Helpers.getFavItems(Helpers.getFavs()) )

    })
    .catch(err => {
      // Error
    });
  }



  //Returns unique categories filtered per category template block
  matchCategoriesWithTemplates(catArr){
    return Helpers.getUniqueCategories(this.state.recommendations).filter(matchBlockCat => catArr.includes(matchBlockCat))
  }


  render() {

    window.scrollTo(0, 0);

    return (


        <div className="global">
          <main>
            <div id="Favoritos" className={`pb-xl is-detail ${"is-" + this.state.category}`}>

                    <BlockTitle title={this.state.recommendations && !this.state.recommendations.length ? '' : 'Favoritos'} titleclass="big-title mt-s mb-s" descriptionclass="big-description mb-m"/>

                    {this.state.isLoading ? <LoadingSpinner /> : this.matchCategoriesWithTemplates(catTemplate.card) && this.matchCategoriesWithTemplates(catTemplate.card).length ? (
                      Templates.renderCardItems(this.state.recommendations, this.state.contributors, this.state.category)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(catTemplate.musiccard) && this.matchCategoriesWithTemplates(catTemplate.musiccard).length ? (
                      Templates.renderMusicItems(this.state.recommendations, this.state.contributors, this.state.category)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(catTemplate.podcastcard) && this.matchCategoriesWithTemplates(catTemplate.podcastcard).length ? (
                      Templates.renderPodcastItems(this.state.recommendations, this.state.contributors, this.state.category)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(catTemplate.videocard) && this.matchCategoriesWithTemplates(catTemplate.videocard).length ? (
                      Templates.renderVideoItems(this.state.recommendations, this.state.contributors, this.state.category)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(catTemplate.appcard) && this.matchCategoriesWithTemplates(catTemplate.appcard).length ? (
                      //If any category in pagedata match categories in template, then render items in template
                      Templates.renderAppItems(this.state.recommendations, this.state.contributors, this.state.category)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(catTemplate.articlelist) && this.matchCategoriesWithTemplates(catTemplate.articlelist).length ? (
                      Templates.renderArticleItems(this.state.recommendations, this.state.contributors, this.state.category)
                    ) : ('')}

                    {!this.state.isLoading && this.state.recommendations && !this.state.recommendations.length ? <Empty/> : '' }

              <img className="lines" src={process.env.PUBLIC_URL + '/img/lines.svg'} alt="lines"/>

            </div>

          </main>

        </div>
    );
  }//Render

}

export default Myfavs;
