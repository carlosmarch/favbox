import React, { Component } from 'react';

import * as Helpers from './Helpers';
import * as Templates from './templates/Templates';

import Header from './components/Header';
import Footer from './components/Footer';
import BlockTitle from './components/BlockTitle';
import LoadingSpinner from './components/LoadingSpinner';
import Notfound from './views/Notfound';
import {ReactComponent as BackIcon} from './icons/Back.svg';

class Detail extends Component {

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
    window.scrollTo(0, 0);
    fetch(window.$api+'&filterByFormula=Find(%22'+this.state.topic+'%22%2C+'+this.state.category+')')
    .then((resp) => resp.json())
    .then(pagedata => {

      //console.log(pagedata);
      //this.setState({recommendations: pagedata.records});
      window.$pagedata = pagedata.records;
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
        isLoading: true,
        category: Helpers.getUrlCategory(),
        topic : Helpers.getUrlTopic()
      }, () => {
        //Call API && Render again when state (async) is done
        this.componentDidMount()
      });
    }
  }


  //Returns current unique categories filtered per category template block
  matchCategoriesWithTemplates(catArr){
    return Helpers.getUniqueCategories(this.state.recommendations).filter(matchBlockCat => catArr.includes(matchBlockCat))
  }


  render() {

    return (
      <div className="app_wrapper detail_view">

        <Header />

        <div className="global">
          <main>
            <div id="Detail" className={`pb-xl is-detail ${"is-" + this.state.category} ${"is-" + this.state.topic.replace(/ /g, "_")}`}>

                    {!this.state.isLoading && window.$pagedata.length && window.$pagedata.length === 0
                      ? <Notfound/>
                    : (
                        <div className="flex-center container">
                          <div className="back-icon" onClick={this.props.history.goBack}><BackIcon className="" /></div>
                          <BlockTitle title={this.state.topic} titleclass="big-title mt-s" descriptionclass="big-description mb-m"/>
                        </div>
                      )
                    }

                    {this.state.isLoading ? <LoadingSpinner /> : this.matchCategoriesWithTemplates(Templates.catTemplate.card) && this.matchCategoriesWithTemplates(Templates.catTemplate.card).length ? (
                      Templates.renderCardItems(this.state.recommendations, this.state.contributors)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(Templates.catTemplate.cinemacard) && this.matchCategoriesWithTemplates(Templates.catTemplate.cinemacard).length ? (
                      Templates.renderCinemaItems(this.state.recommendations, this.state.contributors, this.state.category)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(Templates.catTemplate.musiccard) && this.matchCategoriesWithTemplates(Templates.catTemplate.musiccard).length ? (
                      Templates.renderMusicItems(this.state.recommendations, this.state.contributors, this.state.category)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(Templates.catTemplate.podcastcard) && this.matchCategoriesWithTemplates(Templates.catTemplate.podcastcard).length ? (
                      Templates.renderPodcastItems(this.state.recommendations, this.state.contributors, this.state.category)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(Templates.catTemplate.videocard) && this.matchCategoriesWithTemplates(Templates.catTemplate.videocard).length ? (
                      Templates.renderVideoItems(this.state.recommendations, this.state.contributors, this.state.category)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(Templates.catTemplate.appcard) && this.matchCategoriesWithTemplates(Templates.catTemplate.appcard).length ? (
                      Templates.renderAppItems(this.state.recommendations, this.state.contributors, this.state.category)
                    ) : ('')}

                    {this.state.isLoading ? '' : this.matchCategoriesWithTemplates(Templates.catTemplate.articlelist) && this.matchCategoriesWithTemplates(Templates.catTemplate.articlelist).length ? (
                      Templates.renderArticleItems(this.state.recommendations, this.state.contributors, this.state.category)
                    ) : ('')}


              <img className="lines" src={process.env.PUBLIC_URL + '/img/lines.svg'} alt="lines"/>

            </div>

          </main>

          <Footer/>

        </div>
      </div>
    );
  }//Render


}

export default Detail;
