import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import Signup from '../views/Signup';

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
    ReactDOM.render(<Signup email={this.state.email}/>, document.getElementById('root'))
  }


  render() {

    return (
      <header className="header no@m">
        <div className="container">

          <ul id="primarymenu" className="nav menu">
            <li><Link to="/home"><img className="logo" src={process.env.PUBLIC_URL + '/logo.svg'} alt="logo"/></Link></li>
            <li><Link to="/feed">Discover</Link></li>
            <li><Link to="/signup">Sign in</Link></li>
            <li><Link to="/login">Log in</Link></li>
          </ul>

          <div className="form no@m">
            <form className="email-form" onSubmit={this.handleSubmit}>
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
                  required
                  />
              </div>
              <button type="submit" className="email-form__submit" mailto="">
                <span className="email-form__submit__label">Get started!</span>
              </button>
            </form>
          </div>
        </div>
      </header>
    );
  }
}

export default HeaderMkt;
