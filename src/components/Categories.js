import React, { Component } from "react";

import BlockTitle from './BlockTitle';

class Categories extends Component {

  constructor(){
      super();
      this.state = {
          categorias: window.$categories,
          temas: window.$topics
      }
  }

  render() {

    return (
      <div className="AllTopics">
          <div className="Categories mt-l">
            {this.state.categorias?.map((records) =>
              <BlockTitle title={records} link={`categorias/${records}`} />
            )}
          </div>

          <div className="Topics mb-l">
            {this.state.temas?.map((records) =>
              <BlockTitle title={records} link={`temas/${records}`} />
            )}
          </div>
      </div>

    );
  }
}

export default Categories;
