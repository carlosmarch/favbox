import React, { Component } from "react";
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom'
class Dropdown extends Component {
  render() {
    //object to array
    const items = Object.values(this.props.item);
    const type = Object.values(this.props.type);

    const listItems = items.map((topic, key) =>
      <li key={topic}>
        <Link to={`/${this.props.type}/${topic}`}>{topic}</Link>
      </li>
    );

    return (
      <div id={'dropdown-'+this.props.type+''} className="drop-overlay">
        <ul>{listItems}</ul>
      </div>
    );
  }
}

export default Dropdown;
//ReactDOM.render(<Dropdown />, document.getElementById('root'))
