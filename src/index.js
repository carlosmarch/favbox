import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import './css/index.css';

import Header from './components/Header';
import Footer from './components/Footer';

import App from './App';
import Detail from './Detail';
import About from './About';
import Notfound from './Notfound';
import Myfavs from './Myfavs';

import * as serviceWorker from './serviceWorker';

window.$api = 'https://api.airtable.com/v0/appOyoqCMxKWB0IG8/recommendations?api_key=keyu0nFPUS8ZCnRmb';
window.$api_contributors = 'https://api.airtable.com/v0/appOyoqCMxKWB0IG8/contributors?api_key=keyu0nFPUS8ZCnRmb';

const routing = (
  <Router>

      <Header />

      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/categorias/:id" component={Detail} />
        <Route path="/temas/:id" component={Detail} />
        <Route path="/colecciones/:id" component={Detail} />
        <Route exact path="/about" component={About} />
        <Route exact path="/favoritos" component={Myfavs} />
        <Route component={Notfound} />
      </Switch>

      <Footer />

  </Router>
)


ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
