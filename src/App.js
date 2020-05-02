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
    if(window.$alldata && window.$allcontributors){
      this.setState({
        isLoading: false,
        recommendations: window.$alldata.sort(() => Math.random() - 0.5),//random order
        contributors: window.$allcontributors.records}
      );
      return
    }
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
      window.$allcontributors = contributors;
      this.setState({
        isLoading: false,
        recommendations: window.$alldata.sort(() => Math.random() - 0.5),//random order
        contributors: contributors.records}
      );
    })
    .catch(err => {
      // Error
      console.err(err)
    });
  }

  render() {

          return (
            <div className={ userController.isAuthenticated() ? 'app_wrapper app_view' : 'app_wrapper app-view-not-logged' }>

              <Header />

              <div className="global appview">

                <main>

                    <section className="GridCard">
                        <BlockTitle title={'Books'} link={'categories/book'}/>
                        <div className="container container-xl">
                            <div className="grid">
                              {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations, 'book', 4).map((records) =>
                                <Card {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                              )}
                            </div>
                        </div>
                    </section>

                    <section className="GridCard block">
                        <BlockTitle title={'Movies & shows'} link={'categories/show'}/>
                        <div className="container container-xl">
                            <div className="grid">
                              {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations, 'movie', 8).map((records) =>
                                <Card {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                              )}
                              {this.state.isLoading ? '' : Helpers.getCategoryItems(this.state.recommendations, 'show', 8).map((records) =>
                                <Card {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                              )}
                            </div>
                        </div>
                    </section>

                    <section className="MusicGrid block">
                        <BlockTitle title={'Music'} link={'categories/music'}/>
                        <div className="container">
                            <div className="grid">
                                {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations,'music', 8).map((records) =>
                                  <Musiccard {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                                )}
                            </div>
                        </div>

                        <BlockTitle title={'Podcasts'} link={'categories/podcast'} titleclass="mt-l"/>
                        <div className="container">
                            <div className="grid mt-s">
                                {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations,'podcast', 4).map((records) =>
                                  <Podcastcard {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                                )}
                            </div>
                        </div>
                    </section>


                    <section className="GridCard block">
                        <BlockTitle title={'Magazines'} link={'categories/magazine'}/>
                        <div className="container container-xl">
                          <div className="grid">
                              {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations,'magazine', 4).map((records) =>
                                <Card {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                              )}
                            <img className="lines" src={process.env.PUBLIC_URL + '/img/dot-3.svg'} alt="lines"/>
                          </div>
                        </div>
                    </section>


                    <section className="AppGrid block">
                        <div className="container">
                              <div className="grid">
                                    <div className="grid__item width-8/12 width-12/12@m grid">
                                        {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations,'app', 8).map((records) =>
                                          <Appcard {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                                        )}
                                    </div>
                                    <div className="grid__item width-4/12 width-12/12@m">
                                        <BlockTitle title={'Apps'} description={'Apps for everyone'} link={'categories/app'}/>
                                    </div>
                              </div>
                        </div>
                    </section>


                    <section className="GridVideo block">
                        <BlockTitle title={'Videos'} link={'categories/video'}/>
                        <div className="container container-xl">
                          <div className="grid">
                              {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations,'video', 6).map((records) =>
                                <Videocard {...records.fields} key={records.id} itemId={records.id} autor={Helpers.getContributor(this.state.contributors, records.fields.contribuidor)}/>
                              )}
                          </div>
                        </div>
                    </section>




                    <section className="GridColection block">
                        <BlockTitle title={'Collections'} description={'Collections made to inspire'}/>
                        <div className="container container-xl">
                          <div className="grid mt-s">
                              <Collectioncard title={'darle al coco'} grid={'width-4/12'} number={Helpers.getCollectionItems(this.state.recommendations, 'darle al coco').length}/>
                              <Collectioncard title={'mantenerse en forma'} grid={'width-4/12'} number={Helpers.getCollectionItems(this.state.recommendations, 'mantenerse en forma').length} />
                              <Collectioncard title={'futuros'} grid={'width-4/12'} number={Helpers.getCollectionItems(this.state.recommendations, 'futuros').length} />
                          </div>
                        </div>
                    </section>


                    <section className="ArticlesGrid block">
                      <BlockTitle
                        title={'What to read'}
                        description={'Articles, newsletters & webs.'}
                        titleclass="big-title" descriptionclass="big-description" />
                      <div className="container">
                        <div className="mt-s">
                            {this.state.isLoading ? <LoadingSpinner /> : Helpers.getCategoryItems(this.state.recommendations,'article', 20).map((records) =>
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
                    </section>

                    { this.state.isAuthenticated ? '' : <section className="block no@m"><Promocard /></section> }


                    <section className="TopicCollection no@m">
                      <div className="container container-s">
                        <div className="grid">
                          {window.$topics && window.$topics.map((topics, key) =>
                              <Link to={`/topics/${topics}`} key={key} className="topic-card width-3/12 width-6/12@m">{topics}</Link>
                          )}
                        </div>
                      </div>
                    </section>



                </main>
              </div>

              <Footer />


            </div>
          );//render

  }
}

export default App;
