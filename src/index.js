import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom'
import history from './history';

import './css/index.css';

import BottomBar from './components/BottomBar';

import App from './App';
import Detail from './Detail';
import About from './views/About';
import Notfound from './views/Notfound';
import Myfavs from './Myfavs';
import Categories from './views/Categories';
import Signup from './views/Signup';
import Login from './views/Login';
import Home from './views/Home';
import Profile from './views/Profile';
import Likes from './views/Likes';
import Create from './views/Create';
import Forgot from './views/Forgot';

import * as serviceWorker from './serviceWorker';

window.$api = 'https://api.airtable.com/v0/'+process.env.REACT_APP_AIRTABLE_BASE_ID+'/recommendations?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY;
window.$api_contributors = 'https://api.airtable.com/v0/'+process.env.REACT_APP_AIRTABLE_BASE_ID+'/contributors?api_key='+process.env.REACT_APP_AIRTABLE_API_KEY;


const routing = (
  <Router history={history}>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/feed" component={App} />

        <Route path="/categorias/:id" component={Detail} />
        <Route path="/temas/:id" component={Detail} />
        <Route path="/colecciones/:id" component={Detail} />

        <Route exact path="/about" component={About} />
        <Route exact path="/favoritos" component={Myfavs} />
        <Route exact path="/categorias" component={Categories} />

        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot" component={Forgot} />

        <Route exact path="/create" component={Create}/>
        <Route exact path="/likes" component={Likes}/>
        <Route exact path="/profile" component={Profile}/>

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
