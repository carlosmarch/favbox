import React, { Component } from "react";
import Message from '../components/Message';

const userController = require('../controllers/userController');

class Forgot extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  emailChangeHandler = (event) => {
    this.setState({email: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({isLoading: true});
  }


  render() {

    return (
      <div className="app_wrapper forgot_view">

        <div className="global">
          <div className="container container-s">

            <div className="form-container">
              <div className="mb-s text-center">
                <h5 className="centered">I forgot my password</h5>
              </div>
              {this.props.message ? <Message type={this.props.type} message={this.props.message}/> : ''}
              <form className="signup-form" action="/forgot" method="POST">
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
                <span className="mb-s block">Write the email address associated with your account and we will send you the instructions to reset your password.</span>
                <button className="button submitbtn inline" type="submit">{this.state.isLoading ? 'loading' : 'Reset Password'}</button>
              </form>

            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default Forgot;
