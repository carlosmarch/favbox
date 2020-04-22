import React, { Component } from "react";
import history from '../history';
import Message from '../components/Message';

const userController = require('../controllers/userController');

class Login extends Component {


  constructor() {
    super();
    this.state = {
      isLoading: this.props?.location.state?.loading ? this.props.location.state.loading : false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  emailChangeHandler = (event) => {
    this.setState({email: event.target.value});
    this.setState({isLoading: false});
  }
  passwordChangeHandler = (event) => {
    this.setState({password: event.target.value});
    this.setState({isLoading: false});
  }

  handleSubmit(event) {
    event.preventDefault();
    //AUTH
    userController.authenticate(this.state)
    this.setState({isLoading: true});
  }

  componentDidMount(){
    //Clear history state messages
    if (history.location.state && history.location.state.message) {
        let state = { ...history.location.state };
        delete state.message
        delete state.type
        history.replace({ ...history.location, state });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isLoading: false});
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

                                {this.props.location.state?.message ?
                                  <Message type={this.props.location.state.type} message={this.props.location.state.message}/>
                                  : ''}

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
