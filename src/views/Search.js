import React, { Component } from "react";
import { Link } from 'react-router-dom';
import * as Helpers from '../Helpers';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
//import {ReactComponent as SearchIcon} from '../icons/Search.svg';

import * as Templates from '../templates/Templates';

class Search extends Component {

  constructor(){
      super();
      this.state = {
          isLoading: false,
          categories: window.$categories,
          topics: window.$topics
      }
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    if(!window.$categories){
      this.setState({ isLoading: true });
      fetch(window.$api)
        .then((resp) => resp.json())
        .then(data => {

          Helpers.storeUniqueTopics(data.records)
          Helpers.storeUniqueCategories(data.records)
          window.$alldata = data.records;
          this.setState({
            isLoading: false,
            categories: window.$categories,
            topics: window.$topics
          }, () => {
            //Call API && Render again when state (async) is done
            this.componentDidMount()
          });


      })
      .catch(err => {
        console.log( Error(err));
      });
    }
  }


  render() {

    return (
      <div className="app_wrapper search_view">

        <Header />
        <div className="global">
          {/*Search Input
          <div className="container">
            <div className="input-search-icon-container">
              <SearchIcon className="icon-24 icon-grey-soft" />
              <input id="url"
                name="url"
                component="input"
                type="text"
                onChange={this.urlChangeHandler}
                placeholder='How can we help you?'
                required
                autoFocus
                value={this.state.url}
                className="big-input"
              />
             {this.state.isLoadingUrl ? <div className="loader-icon-container"><i className="loader-icon"></i></div> : ''}
            </div>
          </div>
          */}

          <div className="AllTopics container">
              <div className="Categories mt-l mb-l">
                {this.state.isLoading ? <LoadingSpinner /> : this.state.categories?.map((category, key) =>
                  <div className="flex-center mb-s">
                    {Templates.getCategoryIcon(category, 'icon-40 icon-interaction')}
                    <Link to={`categories/${category}`} key={key} className="block-title ml-s hv-in">{category}</Link>
                  </div>
                )}
              </div>
              {/*
              <div className="Topics mb-l">
                {this.state.isLoading ? '' : this.state.topics?.map((topic, key) =>
                  <BlockTitle title={topic} link={`topics/${topic}`} key={key}/>
                )}
              </div>
              */}
          </div>
        </div>

        <Footer/>

      </div>
    );
  }
}

export default Search;
