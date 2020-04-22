import React, { Component } from "react";
import { Link } from 'react-router-dom';
import history from '../history';
import Message from '../components/Message';

const userController = require('../controllers/userController');

class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  nameChangeHandler = (event) => {
    this.setState({name: event.target.value});
    this.setState({isLoading: false});
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
    //ADD USER WITH FORM DATA
    userController.addUser(this.state, userController.storePassword)
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
    this.setState({isLoading: false});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isLoading: false});
  }

  render() {

    return (

      <div className="app_wrapper signup_view">
        <header className="header no@m">
          <div className="container text-center">
            <Link to="/"><img className="logo" src={process.env.PUBLIC_URL + '/logo.svg'} alt="logo"/></Link>
          </div>
        </header>
        <div className="global">
          <div className="container container-s">

            <div className="form-container">
              <div className="mb-s text-center">
                <h3 className="centered">Get started</h3>
                <p>Absolutely free.</p>
              </div>

              {history.location.state && this.props.location.state?.message ?
                <Message type={this.props.location.state.type} message={this.props.location.state.message}/>
                : ''}

              <form onSubmit={this.handleSubmit} className="signup-form">
                <div>
                  <label>Name</label>
                  <input
                    name="name"
                    component="input"
                    type="text"
                    autoComplete="name"
                    onChange={this.nameChangeHandler}
                    placeholder="Dieter Rams"
                    required
                  />
                </div>
                <div>
                  <label>Email</label>
                  {history.location.state && this.props.location.state?.email ?
                    <input
                    name="email"
                    component="input"
                    type="email"
                    autoComplete="email"
                    onChange={this.emailChangeHandler}
                    placeholder="dieter@rams.com"
                    required
                    value={this.props.location.state.email} />
                  :
                    <input
                    name="email"
                    component="input"
                    type="email"
                    autoComplete="email"
                    onChange={this.emailChangeHandler}
                    placeholder="dieter@rams.com"
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
                    pattern=".{8,}"
                    onChange={this.passwordChangeHandler}
                    placeholder="At least 8 characters"
                    required
                  />
                </div>

                <button className="button submitbtn inline" type="submit">{this.state.isLoading ? 'loading' : 'SignUp'}</button>
              </form>
              <span className="centered">Already have an account? <Link to="/login" className="link">Login</Link></span>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default SignUp;
