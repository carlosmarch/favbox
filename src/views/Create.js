import React, { Component } from "react";

import * as Helpers from '../Helpers';

import Header from '../components/Header';
import Message from '../components/Message';

//AIRTABLE HELPERS
const data = require('../controllers/dataController.js');
const recommendationController = require('../controllers/recommendationController.js');

const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
const table = base('recommendations');

//@TODO
//REVIEW REQUIRED SELECT OPTION

class Create extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      contribuidor: [JSON.parse(localStorage.getItem('userSession'))?.id]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  titleChangeHandler = (event) => {
    this.setState({title: event.target.value});
  }
  descriptionChangeHandler = (event) => {
    this.setState({description: event.target.value});
  }
  urlChangeHandler = (event) => {
    this.setState({url: event.target.value});
  }
  passwordChangeHandler = (event) => {
    this.setState({password: event.target.value});
  }
  imageUrlChangeHandler = (event) => {
    this.setState({imageUrl: event.target.value});
  }
  categoriasChangeHandler = (event) => {
    this.setState({categorias: event.target.value});
  }
  temasChangeHandler = (event) => {
    this.setState({temas: [event.target.value]});
  }



  handleSubmit(event) {
    event.preventDefault();
    //ADD USER WITH FORM DATA
    recommendationController.addItem(this.state)
    this.setState({isLoading: true});
  }

  getUniqueCategories(){
    fetch(window.$api)
    .then((resp) => resp.json())
    .then(data => {
      Helpers.storeUniqueTopics(data.records)
      Helpers.storeUniqueCategories(data.records)
      //Helpers.getUniqueCategories(data.records)
      //Helpers.getUniqueTopics(data.records)
      window.$alldata = data.records;
      this.setState({
        isLoading: false,
        uniqueCategories: window.$categories,
        uniqueTopics: window.$topics
      });

    })
  }

  componentDidMount() {

    const uniqueCats = window.$categories
    const uniqueTops = window.$topics

    if ( !uniqueCats || !uniqueTops) {
      this.getUniqueCategories()
    }else{
      this.setState({
        isLoading: false,
        uniqueCategories: uniqueCats,
        uniqueTopics : uniqueTops
      });
    }

  }


  render() {

    return (
      <div className="app_wrapper create_view">
        <Header />
        <div className="global">
          <div className="container container-s">

            <div className="form-container">
              <div className="mb-s text-center">
                <h3 className="centered">Add an item</h3>
                <p>Tell everyone why it´s awesome.</p>
              </div>

              {this.props.message ? <Message type={this.props.type} message={this.props.message}/> : ''}

              <form onSubmit={this.handleSubmit} className="signup-form">
                <div>
                  <label>Title</label>
                  <input
                    name="title"
                    component="input"
                    type="text"
                    onChange={this.titleChangeHandler}
                    required
                  />
                </div>
                <div>
                  <label>Description</label>
                  <input
                    name="description"
                    component="input"
                    type="text"
                    onChange={this.descriptionChangeHandler}
                    required
                  />
                </div>
                <div>
                  <label>Featured Image</label>
                  <input
                    name="imageUrl"
                    component="input"
                    type="text"
                    onChange={this.imageUrlChangeHandler}
                    required
                  />
                </div>
                <div>
                  <label>Item Url</label>
                  <input
                    name="url"
                    component="input"
                    type="text"
                    onChange={this.urlChangeHandler}
                    required
                  />
                </div>
                <div>
                  <label>Category</label>
                  <select
                    name="categorias"
                    onChange={this.categoriasChangeHandler}
                    required
                  >
                  <option hidden disabled selected value=""> Select a category </option>
                  {this.state.isLoading ? '' :this.state.uniqueCategories.map((category, i) => <option key={i} value={category}>{category}</option>)}
                  </select>
                </div>
                <div>
                  <label>Topic</label>
                  <select
                    name="temas"
                    onChange={this.temasChangeHandler}
                  >
                  <option hidden disabled selected value=""> Select a topic </option>
                  {this.state.isLoading ? '' :this.state.uniqueTopics.map((topic, i) => <option key={i} value={topic}>{topic}</option>)}
                  </select>
                </div>

                <button className="button submitbtn inline mt-s" type="submit">{this.state.isLoading ? 'loading' : 'Create Item'}</button>

            </form>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default Create;
