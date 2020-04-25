import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as Helpers from './Helpers';

import Header from './components/Header';
import Footer from './components/Footer';
import BlockTitle from './components/BlockTitle';
import Card from './components/Card';
import Musiccard from './components/Musiccard';
import Podcastcard from './components/Podcastcard';
import Collectioncard from './components/Collectioncard';
import Promocard from './components/Promocard';
import Articlelist from './components/Articlelist';
import Videocard from './components/Videocard';
import Appcard from './components/Appcard';
import LoadingSpinner from './components/LoadingSpinner';

const userController = require('./controllers/userController.js');


class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      recommendations: [],
      contributors: [],
      isAuthenticated: userController.isAuthenticated()
    };
  }

  componentDidMount() {
    fetch(window.$api)
    .then((resp) => resp.json())
    .then(data => {
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

  render() {

          return (
            <div className="app_wrapper app_view">

              <Header />

              <div className="global appview">

                <main>

                    <div className="GridCard mb-l">
                        <BlockTitle title={'Libros'} description={'Las recomendaciones mas destacadas'} link={'categorias/libro'}/>
                        <div className="container container-xl">
                            <div className="grid">
                              {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations, 'libro', 4).map((records) =>
                                <Card {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                              )}
                            </div>
                        </div>
                    </div>




                    <div className="MusicGrid">
                        <BlockTitle title={'Música'} description={'Las recomendaciones mas destacadas'} link={'categorias/música'}/>
                        <div className="container">
                            <div className="grid mt-s">
                                {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations,'música', 8).map((records) =>
                                  <Musiccard {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                                )}
                            </div>
                        </div>

                        <BlockTitle title={'Podcasts'} description={'Las recomendaciones mas destacadas'} link={'categorias/podcast'} titleclass="mt-l"/>
                        <div className="container">
                            <div className="grid mt-s">
                                {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations,'podcast', 4).map((records) =>
                                  <Podcastcard {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="GridCard">
                        <BlockTitle title={'Revistas'} description={'Las recomendaciones mas destacadas'} link={'categorias/revista'}/>
                        <div className="container container-xl">
                          <div className="grid">
                              {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations,'revista', 4).map((records) =>
                                <Card {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                              )}
                            <img className="lines" src={process.env.PUBLIC_URL + '/img/dot-3.svg'} alt="lines"/>
                          </div>
                        </div>
                    </div>


                    <div className="AppGrid mt-l">
                        <div className="container">
                              <div className="grid">
                                    <div className="grid__item width-8/12 width-12/12@m grid">
                                        {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations,'app', 8).map((records) =>
                                          <Appcard {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                                        )}
                                    </div>
                                    <div className="grid__item width-4/12 width-12/12@m">
                                        <BlockTitle title={'Apps'} description={'Apps para todo el mundo'} link={'categorias/app'}/>
                                    </div>
                              </div>
                        </div>
                    </div>


                    <div className="GridVideo mt-l">
                        <BlockTitle title={'Videos'} description={'Las recomendaciones mas destacadas'} link={'categorias/video'}/>
                        <div className="container container-xl">
                          <div className="grid">
                              {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations,'video', 6).map((records) =>
                                <Videocard {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                              )}
                            <img className="lines" src={process.env.PUBLIC_URL + '/img/dot-2.svg'} alt="lines"/>
                          </div>
                        </div>
                    </div>




                    <div className="GridColection mt-l">
                        <BlockTitle title={'Colecciones'} description={'Las recomendaciones mas destacadas'}/>
                        <div className="container container-xl">
                          <div className="grid mt-s">
                              <Collectioncard title={'darle al coco'} grid={'width-4/12'} number={Helpers.getCollectionItems(this.state.recommendations, 'darle al coco').length}/>
                              <Collectioncard title={'mantenerse en forma'} grid={'width-4/12'} number={Helpers.getCollectionItems(this.state.recommendations, 'mantenerse en forma').length} />
                              <Collectioncard title={'pandemias, contagios y visionarios'} grid={'width-4/12'} number="0" />
                              <Collectioncard title={'aprender'} grid={'width-6/12'} number={Helpers.getCollectionItems(this.state.recommendations, 'aprender').length} />
                              <Collectioncard title={'futuros'} grid={'width-6/12'} number={Helpers.getCollectionItems(this.state.recommendations, 'futuros').length} />
                          </div>
                        </div>
                    </div>


                    <div className="ArticlesGrid mt-l">
                      <BlockTitle
                        title={'Qué leer'}
                        description={'Artículos, newsletters y webs para entretenerse un rato navegando.'}
                        titleclass="big-title" descriptionclass="big-description" link={'categorias/artículo'}/>
                      <div className="container">
                        <div className="mt-s">
                            {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations,'artículo', 20).map((records) =>
                              <Articlelist {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                            )}
                            {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations,'newsletter', 20).map((records) =>
                              <Articlelist {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                            )}
                            {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations,'web', 20).map((records) =>
                              <Articlelist {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                            )}
                        </div>
                      </div>
                    </div>

                    { this.state.isAuthenticated ? '' : <Promocard /> }


                    <div className="TopicCollection mt-l no@m">
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

              <Footer />


            </div>
          );//render

  }
}

export default App;
