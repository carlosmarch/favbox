import React, { Component } from "react";
import Message from '../components/Message';

const userController = require('../controllers/userController');

class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  nameChangeHandler = (event) => {
    this.setState({name: event.target.value});
  }

  emailChangeHandler = (event) => {
    this.setState({email: event.target.value});
  }

  passwordChangeHandler = (event) => {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    userController.addUser(this.state, userController.storePassword)
    this.setState({isLoading: true});
  }


  render() {

    return (
      <div className="app_wrapper signup_view">

        <div className="global">
          <div className="container container-s">

            <div className="form-container">
              <div className="mb-s text-center">
                <h3 className="centered">Get started</h3>
                <p>Absolutely free.</p>
              </div>
              {this.props.message ? <Message type={this.props.type} message={this.props.message}/> : ''}
              <form onSubmit={this.handleSubmit} className="signup-form">
                <div>
                  <label>Name</label>
                  <input
                    name="name"
                    component="input"
                    type="text"
                    autoComplete="name"
                    onChange={this.nameChangeHandler}
                    required
                  />
                </div>
                <div>
                  <label>Email</label>
                  {this.props.email ?
                    <input
                    name="email"
                    component="input"
                    type="email"
                    autoComplete="email"
                    onChange={this.emailChangeHandler}
                    required
                    value={this.props.email} />
                  :
                    <input
                    name="email"
                    component="input"
                    type="email"
                    autoComplete="email"
                    onChange={this.emailChangeHandler}
                    required />
                  }
                </div>
                <div>
                  <label>Password</label>
                  <input
                    name="password"
                    component="input"
                    type="password"
                    autoComplete="current-password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    onChange={this.passwordChangeHandler}
                    required
                  />
                </div>

                <button className="button submitbtn inline" type="submit">{this.state.isLoading ? 'loading' : 'SignUp'}</button>
              </form>
              <span className="centered">Already have an account? <a className="link" href="/login">Login</a></span>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default SignUp;
