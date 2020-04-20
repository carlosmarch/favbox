import React, { Component } from "react";

import Message from '../components/Message';

const userController = require('../controllers/userController');

class Login extends Component {


  constructor() {
    super();
    this.state = {
      isLoading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  emailChangeHandler = (event) => {
    this.setState({email: event.target.value});
  }
  passwordChangeHandler = (event) => {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    userController.authenticate(this.state)
    this.setState({isLoading: true});
  }


  render() {

    return (
      <div className="app_wrapper login_view">
          <div className="grid">

                  <div className="grid__item width-3/12 width-12/12@m left-pane">
                    <div className="left-pane-quote">
                      <div className="left-pane-quote-text">
                        I can get inspiration & cultural references from people around the world.
                      </div>
                    </div>
                  </div>
                  <div className="grid__item width-9/12 width-12/12@m right-pane">
                    <div className="right-pane-content">
                              <div className="form-container">
                                <div className="right-pane-text mb-s">
                                  <h5 className="big-title">Welcome back.</h5>
                                  <p>Enter your details below.</p>
                                </div>
                                {this.props.message ? <Message type={this.props.type} message={this.props.message}/> : ''}
                                <form onSubmit={this.handleSubmit} className="login-form">
                                  <div>
                                    <label>Email</label>
                                    <input
                                      name="email"
                                      component="input"
                                      type="email"
                                      autoComplete="email"
                                      onChange={this.emailChangeHandler}
                                      required
                                    />
                                  </div>
                                  <div>
                                    <label>Password</label>
                                    <input
                                      name="password"
                                      component="input"
                                      type="password"
                                      autoComplete="current-password"
                                      onChange={this.passwordChangeHandler}
                                      required
                                    />
                                  </div>

                                  <button className="button submitbtn inline" type="submit">{this.state.isLoading ? 'loading' : 'Login'}</button>
                                </form>
                                <span>Forgot your password? <a className="link" href="/forgot">Reset Password</a></span>
                                <span>Don’t have an account? <a className="link" href="/signup">Get started</a></span>
                              </div>
                    </div>
                  </div>

          </div>
      </div>
    );
  }
}

export default Login;
