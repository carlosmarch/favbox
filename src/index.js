import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import ReactGA from 'react-ga';
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
import Item from './views/Item';
import Settings from './views/Settings';

import * as serviceWorker from './serviceWorker';
const userController = require('./controllers/userController.js');

window.$api = 'https://api.airtable.com/v0/'+process.env.REACT_APP_AIRTABLE_BASE_ID+'/recommendations?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY;
window.$api_contributors = 'https://api.airtable.com/v0/'+process.env.REACT_APP_AIRTABLE_BASE_ID+'/contributors?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY;

//Analytics
ReactGA.initialize(process.env.REACT_APP_GA_KEY);
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});
ReactGA.set({ userId: userController.getSession()?.id })

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

        <Route path="/categories/:id" component={Detail} />
        <Route path="/topics/:id" component={Detail} />
        <Route path="/collection/:id" component={Detail} />
        <Route path="/profile/:id" component={ExternalProfile} />
        <Route path="/item/:id" component={Item} />

        <Route exact path="/about" component={About} />
        <Route exact path="/search" component={Search} />

        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />

        <AuthenticatedRoute path="/create" component={CreateUrl}/>
        <AuthenticatedRoute path="/likes" component={Likes}/>
        <AuthenticatedRoute path="/profile" component={Profile}/>
        <AuthenticatedRoute path="/settings" component={Settings}/>

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
