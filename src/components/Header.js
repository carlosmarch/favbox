import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'


class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="nav logo">#mequedoencasa</div>

          <ul className="nav menu">
            <li><Link to="/">Home</Link></li>
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
