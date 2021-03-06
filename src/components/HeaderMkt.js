import React, { Component } from "react";
import history from '../history';
import { Link } from 'react-router-dom';

import {ReactComponent as UserIcon} from '../icons/User.svg';
import {ReactComponent as LikeIcon} from '../icons/Heart.svg';
import {ReactComponent as AddIcon} from '../icons/Plus.svg';

const userController = require('../controllers/userController.js');

class HeaderMkt extends Component {

  constructor(){
      super();
      this.state = {
          email:''
      };
  }

  emailChangeHandler = (event) => {
    this.setState({email: event.target.value});
  }
  handleSubmit = (event) => {
    event.preventDefault();
    history.push({
      pathname: '/signup',
      state: {
        email: this.state.email
      }
    })
  }


  render() {

    return (
      <header className="header no@m">
        <div className="container flex-justify">

          <ul id="primarymenu" className="nav menu">
            <li><Link to="/"><img className="logo" src={process.env.PUBLIC_URL + '/logo.svg'} alt="logo"/></Link></li>
            <li><Link to="/feed">Discover</Link></li>
          </ul>
          { userController.isAuthenticated() ? (
            <ul id="usermenu" className="nav menu">
              <li>
                <Link to="/create" className="link"><AddIcon /> Create</Link>
              </li>
              <li>
                <Link to="/likes"><LikeIcon /> Likes</Link>
              </li>
              <li>
                <Link to="/profile"><UserIcon /> Profile</Link>
              </li>
            </ul>
          ) : (
            <div className="form form-wrap">
              <form className="email-form no@m" onSubmit={this.handleSubmit}>
                <div className="email-form__input-wrapper">
                  <input
                    type="email"
                    id="email"
                    className="email-form__input"
                    aria-required="true"
                    aria-invalid="false"
                    aria-describedby="signup-cta-error"
                    placeholder="Email"
                    autoComplete="email"
                    onChange={this.emailChangeHandler}
                    />
                </div>
                <button type="submit" className="email-form__submit" mailto="">
                  <span className="email-form__submit__label">Get started!</span>
                </button>
              </form>
              <Link to="/login" className="button button-outline button-header-login">Sign in</Link>
            </div>
          )}
        </div>
      </header>
    );
  }
}

export default HeaderMkt;
