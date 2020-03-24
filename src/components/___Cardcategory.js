import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Cardcategory extends Component {
  render() {
    return (

      <Link to={ '/temas/' + this.props.categorias }>{this.props.categorias}</Link>

    );
  }
}

export default Cardcategory;
