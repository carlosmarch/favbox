import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Helpers from './Helpers';
import Hero from './components/Hero';
import BlockTitle from './components/BlockTitle';
import Card from './components/Card';
import Collectioncard from './components/Collectioncard';
import Button from './components/Button';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
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

  //Get autor data by autor ID "rec9p8GxW7FJxPtg5" "recbofdaqGgFjL20L"
  getAutordata(item){
    const itemid = item[0];
    //console.log('getItemInfo RETURNS', this.state.contributors.filter(item => item.id.indexOf(itemid) !== -1) );
    return this.state.contributors.filter(contributor => contributor.id.indexOf(itemid) !== -1);
  }

  countCollectionItems(collectionName){
    return this.state.recommendations.filter(recommendation => recommendation.fields.coleccion[0].indexOf(collectionName) !== -1).length
  }


  render() {

    return (

        <div className="global">

          <Hero />

          <main>

              <div id="GridCard">
                <BlockTitle title={'Destacados'} description={'Las recomendaciones mas destacadas'}/>
                <div className="container container-xl">
                    <div className="grid-card">
                      {this.state.recommendations.map((records) =>
                        <Card {...records.fields} key={records.id} autor={this.getAutordata(records.fields.autor)}/>
                      )}
                      <img className="lines" src={process.env.PUBLIC_URL + '/img/lines.svg'} alt="lines"/>
                    </div>
                </div>
              </div>

              <div className="GridColection mt-l">
                <BlockTitle title={'Colecciones'} description={'Las recomendaciones mas destacadas'}/>
                <div className="container">
                  <div className=" grid mt-s">
                      <Collectioncard title={'Darle al coco'} grid={'width-4/12'} number={this.countCollectionItems('Darle al coco')}/>
                      <Collectioncard title={'Mantenerse en forma'} grid={'width-4/12'}/>
                      <Collectioncard title={'Pandemias, contagios y visinarios'} grid={'width-4/12'}/>
                      <Collectioncard title={'Aprender algo'} grid={'width-6/12'}/>
                      <Collectioncard title={'Disfrutar de algo bonito'} grid={'width-6/12'}/>
                  </div>
                </div>
              </div>

              <div className="Invite mt-l">
                <div className="container">
                  <div className="Promocard grid mt-s">
                      <div className="grid__item width-10/12">
                        <h3>Cuéntanos que te gusta</h3>
                        <p>Encontraremos recomendaciones para tí y podrás compartir tus pasatiempos preferidos.</p>
                      </div>
                      <div className="grid__item width-2/12">
                        <Button text="Empezar!" />
                      </div>
                  </div>
                </div>
              </div>

              <div className="TopicCollection mt-l">
                <div className="container container-s">
                  <div className=" grid mt-s">
                    {window.$topics && window.$topics.map((temas, key) =>
                        <Link to={`/temas/${temas}`} key={key} className="topic-card width-3/12">{temas}</Link>
                    )}
                  </div>
                </div>
              </div>

          </main>
        </div>
    );
  }
}

export default App;
