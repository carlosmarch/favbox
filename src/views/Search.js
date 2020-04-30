import React, { Component } from "react";
import * as Helpers from '../Helpers';

import BlockTitle from '../components/BlockTitle';
import LoadingSpinner from '../components/LoadingSpinner';
import {ReactComponent as SearchIcon} from '../icons/Search.svg';

class Search extends Component {

  constructor(){
      super();
      this.state = {
          isLoading: false,
          categorias: window.$categories,
          temas: window.$topics
      }
  }

  componentDidMount(){

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
            categorias: window.$categories,
            temas: window.$topics
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

        <div className="AllTopics">
            <div className="Categories mt-l">
              {this.state.isLoading ? <LoadingSpinner /> : this.state.categorias?.map((records, key) =>
                <BlockTitle title={records} link={`categorias/${records}`} key={key}/>
              )}
            </div>

            <div className="Topics mb-l">
              {this.state.isLoading ? '' : this.state.temas?.map((records, key) =>
                <BlockTitle title={records} link={`temas/${records}`} key={key}/>
              )}
            </div>
        </div>
      </div>
    );
  }
}

export default Search;
