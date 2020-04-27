import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from './history';


import './css/index.css';

import BottomBar from './components/BottomBar';

import App from './App';
import Detail from './Detail';
import About from './views/About';
import Notfound from './views/Notfound';
import Search from './views/Search';
import Signup from './views/Signup';
import Login from './views/Login';
import Home from './views/Home';
import Profile from './views/Profile';
import ExternalProfile from './views/ExternalProfile';
import Likes from './views/Likes';
import CreateUrl from './views/CreateUrl';

import * as serviceWorker from './serviceWorker';
const userController = require('./controllers/userController.js');

window.$api = 'https://api.airtable.com/v0/'+process.env.REACT_APP_AIRTABLE_BASE_ID+'/recommendations?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY;
window.$api_contributors = 'https://api.airtable.com/v0/'+process.env.REACT_APP_AIRTABLE_BASE_ID+'/contributors?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY;

const AuthenticatedRoute = ({ component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      userController.isAuthenticated() ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
            pathname:'/signup',
            state:{from: props.location}
          }}
        />
      )
    }
  />
)


const routing = (
  <Router history={history}>

      <Switch>

        <Route exact path="/" component={Home} />
        <Route exact path="/feed" component={App} />

        <Route path="/categorias/:id" component={Detail} />
        <Route path="/temas/:id" component={Detail} />
        <Route path="/colecciones/:id" component={Detail} />
        <Route path="/profile/:id" component={ExternalProfile} />

        <Route exact path="/about" component={About} />
        <Route exact path="/search" component={Search} />

        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />

        <AuthenticatedRoute path="/create" component={CreateUrl}/>
        <AuthenticatedRoute path="/likes" component={Likes}/>
        <AuthenticatedRoute path="/profile" component={Profile}/>

        <Route component={Notfound} />

      </Switch>

      <BottomBar/>

  </Router>
)


ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
