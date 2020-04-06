import React, { Component } from "react";
import { Link } from 'react-router-dom';
import * as Helpers from '../Helpers';



class Header extends Component {

  constructor(){
      super();
      this.state = {
          isHoveredCategorias: false,
          isHoveredTemas: false,
          categorias: [],
          temas: [],
          hasFavs: typeof Helpers.getFavs() !== 'undefined' && Helpers.getFavs().length > 0
      };
      this.handleHoverCategorias = this.handleHoverCategorias.bind(this);
      this.handleHoverTemas = this.handleHoverTemas.bind(this);
  }

  handleHoverCategorias(){
      this.setState(prevState => ({
          isHoveredCategorias: !prevState.isHoveredCategorias
      }));

      this.setState({
        categorias: window.$categories,
        temas: window.$topics
      });
  }

  handleHoverTemas(){
      this.setState(prevState => ({
          isHoveredTemas: !prevState.isHoveredTemas
      }));
      this.setState({
        categorias: window.$categories,
        temas: window.$topics
      });
  }



  render() {

    return (
      <header className="header">
        <div className="container">

          <ul id="primarymenu" className="nav menu">

            <li><Link to="/">Inicio</Link></li>

            <li id="menuitem-categorias" className={ this.state.isHoveredCategorias ? "hoverstate" : "" } onMouseEnter={this.handleHoverCategorias} onMouseLeave={this.handleHoverCategorias}>
              <div>¿Qué te apetece?</div>
              <svg viewBox="0 0 30 30" className="chevron"><polygon points="15,17.4 4.8,7 2,9.8 15,23 28,9.8 25.2,7 "></polygon></svg>
              <div id={'dropdown-categorias'} className="drop-overlay">
                <ul>
                  {this.state.categorias && this.state.categorias.map((categoria, key) =>
                    <li key={key}>
                      <Link to={`/categorias/${categoria}`}>{categoria}</Link>
                    </li>
                  )}
                </ul>
              </div>
            </li>

            <li id="menuitem-temas" className={ this.state.isHoveredTemas ? "hoverstate" : "" } onMouseEnter={this.handleHoverTemas} onMouseLeave={this.handleHoverTemas}>
              <div>Temas</div>
              <svg viewBox="0 0 30 30" className="chevron"><polygon points="15,17.4 4.8,7 2,9.8 15,23 28,9.8 25.2,7 "></polygon></svg>
              <div id={'dropdown-temas'} className="drop-overlay">
                <ul>
                  {this.state.temas && this.state.temas.map((tema, key) =>
                    <li key={key}>
                      <Link to={`/temas/${tema}`}>{tema}</Link>
                    </li>
                  )}
                </ul>
              </div>
            </li>

            <li><Link to="/about">About</Link></li>

            <li id="Favoritos-button" className="favlink"><Link to="/favoritos">❤ Mis Favoritos</Link></li>


        </ul>

          <div className="form no@m">
            <form className="email-form" action="mailto:carlosmarchinfo@gmail.com">
              <div className="email-form__input-wrapper">
                <input type="email" id="email" className="email-form__input" aria-required="true" aria-invalid="false" aria-describedby="signup-cta-error" placeholder="Email"/>
              </div>
              <button type="submit" className="email-form__submit" mailto="">
                <span className="email-form__submit__label">Quiero participar</span>
              </button>
            </form>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
