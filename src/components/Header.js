import React, { Component } from "react";
import { Link } from 'react-router-dom'

class Header extends Component {

  render() {
    return (
      <header className="header">
        <div className="container">

          <ul id="primarymenu" className="nav menu">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/">¿Qué te apetece?</Link><svg viewBox="0 0 30 30" className="chevron"><polygon points="15,17.4 4.8,7 2,9.8 15,23 28,9.8 25.2,7 "></polygon></svg></li>
            <li><Link to="/">Temas</Link><svg viewBox="0 0 30 30" className="chevron"><polygon points="15,17.4 4.8,7 2,9.8 15,23 28,9.8 25.2,7 "></polygon></svg></li>
            <li><Link to="/about">About</Link></li>
          </ul>

          <div className="form">
            <form className="email-form">
              <div className="email-form__input-wrapper">
                <input type="email" id="email" className="email-form__input" aria-required="true" aria-invalid="false" aria-describedby="signup-cta-error" placeholder="Email"/>
              </div>
              <button type="submit" className="email-form__submit">
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
