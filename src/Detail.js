import React, { Component } from 'react';

import * as Helpers from './Helpers';

import Card from './components/Card';
import BlockTitle from './components/BlockTitle';
import LoadingSpinner from './components/LoadingSpinner';
import Musiccard from './components/Musiccard';
import Podcastcard from './components/Podcastcard';
import Articlelist from './components/Articlelist';

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      recommendations: [],
      category: Helpers.getUrlCategory(),
      topic: Helpers.getUrlTopic(),
      categoryItems: [],
    };
  }

  componentDidMount() {
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
    return this.state.recommendations.filter(recommendation => recommendation.fields.categorias?.includes(categoryName))
  }

  //Order Categories for render in desired order
  getOrderedCategories(pagedata){
    //@TODO ADD NEW ONES!!!
    const categories = ['libro', 'revista', 'música','podcast','artículo','web','newsletter'];
    const uniqueCategories = this.getUniqueCategories(pagedata);
    const filteredCategories = categories.filter( ( cat ) => uniqueCategories.includes( cat ) );
    console.log('filtered',uniqueCategories, filteredCategories)
    return filteredCategories;
  }

  render() {
    window.scrollTo(0, 0);


    return (

        <div className="global">
          <main>

            <div id="Detail" className="pb-xl">
              <BlockTitle title={this.state.category==='categorias' ? this.state.topic+'s' : this.state.topic} description={'Las recomendaciones de '+this.state.topic+' mas destacadas'} titleclass="big-title mt-s" descriptionclass="big-description mb-m"/>
              <div className="container container">
                  <div className="grid">

                    {this.state.isLoading ? <LoadingSpinner /> : this.getOrderedCategories(this.state.recommendations)?.map((catName) =>

                          this.getCategoryItems(catName).map((item, key)  => {

                                if( (catName == 'libro') || (catName == 'revista') ){
                                  console.log('CARD', catName, item)
                                  return <Card {...item.fields} key={key} autor={this.getContributor(item.fields.contribuidor)}/>

                                }else if( catName == 'música' ){
                                  console.log(item.fields.contribuidor)
                                  return <Musiccard {...item.fields} key={item.id}/>

                                }else if( catName == 'podcast' ){
                                  console.log('PODCASTCARD', catName, item)
                                  return <Podcastcard {...item.fields} key={item.id} autor={this.getContributor(item.fields.contribuidor)}/>

                                }else if( (catName == 'artículo') || (catName == 'newsletter') || (catName == 'web') ){
                                  console.log('ARTICLECARD', catName, item)
                                  return <Articlelist {...item.fields} key={item.id} autor={this.getContributor(item.fields.contribuidor)}/>

                                }

                          })


                    )}
                    <img className="lines" src={process.env.PUBLIC_URL + '/img/lines.svg'} alt="lines"/>
                  </div>
              </div>
            </div>

          </main>

        </div>
    );
  }//Render


}

export default Detail;
