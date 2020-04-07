import React, { Component } from "react";
import * as Helpers from '../Helpers';
import Card from '../components/Card';

//<blockCardTemplate records={this.state.recommendations} catArray={catTemplate.card} />

class blockCardTemplate extends Component {
  render() {

    return (

      <div className="GridCard mt-s">
          <div className="container">
              <h3 className="title-divider">Libros y revistas</h3>
              <div className="grid">
                {Helpers.getBlockCategoryItems(this.props.catArray).map((record) =>
                  <Card {...record.fields} key={record.id} itemId={record.id} autor={Helpers.getContributor(record.fields.contribuidor)}/>
                )}
              </div>
          </div>
      </div>

    );
  }
}

export default blockCardTemplate;
