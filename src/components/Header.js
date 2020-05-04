import React, { Component } from "react";
import { Link } from 'react-router-dom';
import history from '../history';
import {ReactComponent as UserIcon} from '../icons/User.svg';
import {ReactComponent as LikeIcon} from '../icons/Heart.svg';
import {ReactComponent as AddIcon} from '../icons/Plus.svg';

import * as Templates from '../templates/Templates';


import * as Helpers from '../Helpers';
const userController = require('../controllers/userController.js');

class Header extends Component {

  constructor(){
      super();
      this.state = {
          isHoveredCategories: false,
          isHoveredTopics: false,
          categories: [],
          topics: [],
          email:''
      };
      this.handleHoverCategories = this.handleHoverCategories.bind(this);
      this.handleHoverTopics = this.handleHoverTopics.bind(this);
  }

  handleHoverCategories(){
      this.setState(prevState => ({
          isHoveredCategories: !prevState.isHoveredCategories
      }));
  }

  handleHoverTopics(){
      this.setState(prevState => ({
          isHoveredTopics: !prevState.isHoveredTopics
      }));
  }

  emailChangeHandler = (event) => {
    this.setState({email: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //ReactDOM.render(<Signup email={this.state.email}/>, document.getElementById('root'))
    history.push({
      pathname: '/signup',
      state: {
        email: this.state.email
      }
    })
  }


  getUniqueCategories(){
    fetch(window.$api)
    .then((resp) => resp.json())
    .then(data => {
      Helpers.storeUniqueTopics(data.records)
      Helpers.storeUniqueCategories(data.records)
      this.setState({
        categories: window.$categories,
        topics: window.$topics
      });
    })
  }

  componentDidMount() {
    if ( !window.$categories || !window.$topics) {
      this.getUniqueCategories()
    }else{
      this.setState({
        categories: window.$categories,
        topics: window.$topics
      });
    }
  }

  render() {

    return (
      <header className="header no@m">
        <div className="container flex-justify">

          <ul id="primarymenu" className="nav menu">

            <li><Link to="/"><img className="logo" src={process.env.PUBLIC_URL + '/logo.svg'} alt="logo"/></Link></li>

            <li><Link to="/feed">Discover</Link></li>
            { userController.isAuthenticated() ? (
            <li id="menuitem-categorias" className={ this.state.isHoveredCategories ? "hoverstate" : "" } onMouseEnter={this.handleHoverCategories} onMouseLeave={this.handleHoverCategories}>
              <div>Feel like?</div>
              <svg viewBox="0 0 30 30" className="chevron"><polygon points="15,17.4 4.8,7 2,9.8 15,23 28,9.8 25.2,7 "></polygon></svg>
              <div id={'dropdown-categorias'} className="drop-overlay">
                <ul>
                  {this.state.categories && this.state.categories.map((category, key) =>
                    <li key={key}>
                      <Link to={`/categories/${category}`}>{Templates.getCategoryIcon(category)}{category}</Link>
                    </li>
                  )}
                </ul>
              </div>
            </li>
            ) : '' }
            { userController.isAuthenticated() ? (
            <li id="menuitem-temas" className={ this.state.isHoveredTopics ? "hoverstate" : "" } onMouseEnter={this.handleHoverTopics} onMouseLeave={this.handleHoverTopics}>
              <div>Topics</div>
              <svg viewBox="0 0 30 30" className="chevron"><polygon points="15,17.4 4.8,7 2,9.8 15,23 28,9.8 25.2,7 "></polygon></svg>
              <div id={'dropdown-temas'} className="drop-overlay">
                <ul>
                  {this.state.topics && this.state.topics.map((topic, key) =>
                    <li key={key}>
                      <Link to={`/topics/${topic}`}>{topic}</Link>
                    </li>
                  )}
                </ul>
              </div>
            </li>
            ) : '' }

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
            <div className="button button-outline button-header-login"><Link to="/signup">SignUp</Link></div>
          )}


        </div>
      </header>
    );
  }
}

export default Header;
