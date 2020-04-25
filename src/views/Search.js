import React, { Component } from "react";
import * as Helpers from '../Helpers';

import BlockTitle from '../components/BlockTitle';
import LoadingSpinner from '../components/LoadingSpinner';


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

    );
  }
}

export default Search;
