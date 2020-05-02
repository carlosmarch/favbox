import React, { Component } from "react";
import history from '../history';
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
      showForm:false,
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
  categoriesChangeHandler = (event) => {
    this.setState({categories: event.target.value});
  }
  topicsChangeHandler = (event) => {
    this.setState({topics: [event.target.value]});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({isLoading: true});
    console.log(this.state)
    //recommendationController.uploadToCloudinary(this.state, recommendationController.addItem) //Upload to cloudinary, then to airtable
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
    if ( !window.$categories || !window.$topics) {
      this.getUniqueCategories()
    }else{
      this.setState({
        isLoading: false,
        uniqueCategories: window.$categories,
        uniqueTopics : window.$topics
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
          url: "https://api.linkpreview.net",
          dataType: 'jsonp',
          data: {q: itemUrl, key: process.env.REACT_APP_LINKPREVIEW_KEY },
          success: function (data) {
              handleData(data)
          }
      });

      const handleData = (data) => {
        this.setState({
          isLoadingUrl: false,
          showForm: true
        });
        if(data){
          if(data?.title){
            this.setState({title: data.title});
          }
          if(data?.description){
            this.setState({description: data.description});
          }
          if(data?.image){
            this.setState({imageUrl: data.image});
          }
        }else{
          //No data
          history.push({
            state: {
              type: 'info',
              message: 'That link has not provided info'
            }
          })
          return
        }
      }

   }

   itemPreview(props){
     return (
       <div className="favitem no-b">
         <div className="favitem-image-holder">
         {props?.imageUrl ? <img className="favitem-image-holder-img" src={props?.imageUrl} alt="cover"/> : ''}
         </div>
         <div className="favitem-description">
           <div className="favitem-category badge inline mt-s">{props?.categories ? props?.categories : 'category' }</div>
           <h6>{props?.title ? props?.title : 'title'}</h6>
           <p className="description-small">{props?.description ? props?.description : 'description'}</p>
         </div>
       </div>
     );
   }

  render() {

    return (
      <div className="app_wrapper create_view">
        <Header />
        <div className="global">
          <div className="container container-s">

            <div className="form-container">
              <div className="mb-m text-center">
                <h3 className="centered alt-font">Add some inspiration</h3>
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
                           <label>Item Link</label>
                           <input id="url"
                             name="url"
                             component="input"
                             type="text"
                             onChange={this.urlChangeHandler}
                             placeholder="External url for the item"
                             required
                             autoFocus
                             value={this.state.url}
                             className="big-input"
                           />
                          {this.state.isLoadingUrl ? <div className="loader-icon-container"><i className="loader-icon"></i></div> : ''}
                         </div>

                         <div className={`create-item-step-2 ${this.state.showForm ? 'show-form' : ''} `}>

                           <div className="itemPreview mb-m">
                              <h6>Preview</h6>
                              {this.itemPreview(this.state)}
                           </div>

                           <div>
                             <h6 className="mb-xs">Edit your item</h6>
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
                               onChange={this.categoriesChangeHandler}
                               required
                             >
                                <option hidden defaultValue value="">Type of resource</option>
                                {this.state.isLoading ? '' : this.state?.uniqueCategories.map((category, i) => <option key={i} value={category}>{category}</option>)}
                             </select>
                           </div>
                           <div>
                             <label>Topic</label>
                             <select id="topics"
                               name="temas"
                               onChange={this.topicsChangeHandler}
                             >
                                <option hidden defaultValue value="">Any topic for your item?</option>
                                {this.state.isLoading ? '' :this.state?.uniqueTopics.map((topic, i) => <option key={i} value={topic}>{topic}</option>)}
                             </select>
                           </div>

                           <button className="button submitbtn inline mt-s" type="submit">{this.state.isLoading ? 'loading' : 'Create Item'}</button>

                         </div>
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
