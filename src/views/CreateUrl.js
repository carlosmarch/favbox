import React, { Component } from "react";
import history from '../history';
import ImageUploader from "react-images-upload";
import { findDOMNode } from 'react-dom';
import $ from 'jquery';

import * as Helpers from '../Helpers';
import Header from '../components/Header';
import Message from '../components/Message';

const recommendationController = require('../controllers/recommendationController.js');


class CreateUrl extends Component {

  constructor() {
    super();
    this.state = {
      isLoading   : true,//until getting dropdown categories
      isLoadingUrl: false,
      contribuidor: [JSON.parse(localStorage.getItem('userSession'))?.id]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  urlChangeHandler = (event) => {
    this.setState({url: event.target.value});
    //this.getMeta(event.target.value)
    this.linkPreview(event.target.value)
    this.setState({isLoadingUrl: true});
  }

  titleChangeHandler = (event) => {
    this.setState({title: event.target.value});
  }
  descriptionChangeHandler = (event) => {
    this.setState({description: event.target.value});
  }
  imageUrlChangeHandler = (event) => {
    this.setState({imageUrl: event.target.value});
  }
  passwordChangeHandler = (event) => {
    this.setState({password: event.target.value});
  }
  categoriasChangeHandler = (event) => {
    this.setState({categorias: event.target.value});
  }
  temasChangeHandler = (event) => {
    this.setState({temas: [event.target.value]});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({isLoading: true});
    recommendationController.uploadToCloudinary(this.state, recommendationController.addItem) //Upload to cloudinary, then to airtable
  }


  getUniqueCategories(){
    fetch(window.$api)
    .then((resp) => resp.json())
    .then(data => {
      Helpers.storeUniqueTopics(data.records)
      Helpers.storeUniqueCategories(data.records)
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

   linkPreview(itemUrl){

      $.ajax({
          url: "http://api.linkpreview.net",
          dataType: 'jsonp',
          data: {q: itemUrl, key: process.env.REACT_APP_LINKPREVIEW_KEY },
          success: function (data) {
              handleData(data)
          }
      });

      const handleData = (data) => {

        this.setState({isLoading: false});

        if(data){
          if(data?.title){
            console.log('heeeey', data.title)
            this.setState({title: data.title});
          }
          if(data?.description){
            this.setState({description: data.description});
          }
          if(data?.image){
            this.setState({imageUrl: data.image});
          }
        }else{
          return
        }
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

              <form onSubmit={this.handleSubmit} className="signup-form">
                <div className="grid">
                        <div className="grid__item width-2/12 width-12/12@m">
                       </div>
                       <div className="grid__item width-8/12 width-12/12@m">

                         {history.location.state && this.props.location.state?.message ?
                           <Message type={this.props.location.state.type} message={this.props.location.state.message}/>
                           : ''}

                         <div className="input-icon-container">
                           <label>Item Link (External Reference)</label>
                           <input id="url"
                             name="url"
                             component="input"
                             type="text"
                             onChange={this.urlChangeHandler}
                             placeholder="External url for the item source"
                             required
                             autoFocus
                             value={this.state.url}
                             className="big-input"
                           />
                          {this.state.isLoadingUrl ? <div class="loader-icon-container"><i class="loader-icon"></i></div> : ''}
                         </div>

                         <div className="create-item-step-2">
                           <div>
                             <label>Title</label>
                             <input id="title"
                               name="title"
                               component="input"
                               type="text"
                               onChange={this.titleChangeHandler}
                               placeholder="Awesome title"
                               required
                               value={this.state.title}
                             />
                           </div>
                           <div>
                             <label>Description</label>
                             <textarea id="description"
                               name="description"
                               component="input"
                               type="text"
                               onChange={this.descriptionChangeHandler}
                               placeholder="Short description for the item"
                               required
                               value={this.state.description}
                             />
                           </div>
                           <div>
                             <label>Featured Image</label>
                             <input id="imageUrl"
                               name="imageUrl"
                               component="input"
                               type="text"
                               onChange={this.imageUrlChangeHandler}
                               placeholder="Featured image for the item"
                               required
                               value={this.state.imageUrl}
                             />
                           </div>
                           <div>
                             <label>Category</label>
                             <select id="categorias"
                               name="categorias"
                               onChange={this.categoriasChangeHandler}
                               required
                             >
                             <option hidden disabled selected value="">Select a category</option>
                             {this.state.isLoading ? '' : this.state?.uniqueCategories.map((category, i) => <option key={i} value={category}>{category}</option>)}
                             </select>
                           </div>
                           <div>
                             <label>Topic</label>
                             <select id="topics"
                               name="temas"
                               onChange={this.temasChangeHandler}
                             >
                             <option hidden disabled selected value="">Select a topic</option>
                             {this.state.isLoading ? '' :this.state?.uniqueTopics.map((topic, i) => <option key={i} value={topic}>{topic}</option>)}
                             </select>
                           </div>
                         </div>

                        <button className="button submitbtn inline mt-s" type="submit">{this.state.isLoading ? 'loading' : 'Create Item'}</button>

                  </div>
              </div>
            </form>

            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default CreateUrl;
