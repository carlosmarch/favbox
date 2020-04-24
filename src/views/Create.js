import React, { Component } from "react";
import history from '../history';
import ImageUploader from "react-images-upload";
import * as Helpers from '../Helpers';
import Header from '../components/Header';
import Message from '../components/Message';

const recommendationController = require('../controllers/recommendationController.js');
const dataController = require('../controllers/dataController.js');


//@TODO
//REVIEW MESSAGING : SUCCESS && ERROR

class Create extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true,//until getting dropdown categories
      contribuidor: [JSON.parse(localStorage.getItem('userSession'))?.id]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
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
  categoriasChangeHandler = (event) => {
    this.setState({categorias: event.target.value});
  }
  temasChangeHandler = (event) => {
    this.setState({temas: [event.target.value]});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({isLoading: true});
    recommendationController.uploadToCloudinary(this.state, recommendationController.addItem) //Upload to cloudinary, the to airtable
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

    //Add required to image uploader input
    var inputUpload = document.getElementsByName("featured_image")[0]
    inputUpload.required = true;

  }

  componentWillReceiveProps(nextProps) {
    this.setState({isLoading: false});
  }


  onDrop(pictureFiles, pictureDataURLs) {
     //console.log('onDrop', pictureFiles)
     //this.uploadToCloudinary(pictureFiles[0])
     this.setState({imageUrl: pictureFiles[0]});
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
                        <div className="grid__item width-5/12 width-12/12@m">
                           <div>
                             <ImageUploader
                               name="featured_image"
                               className={'create-item-uploader'}
                               withPreview={true}
                               withIcon={false}
                               singleImage={true}
                               buttonText="Choose image"
                               onChange={this.onDrop}
                               imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                               maxFileSize={5242880}
                               required
                             />
                           </div>
                       </div>
                       <div className="grid__item width-7/12 width-12/12@m">

                         {history.location.state && this.props.location.state?.message ?
                           <Message type={this.props.location.state.type} message={this.props.location.state.message}/>
                           : ''}
                           <div>
                             <label>Item Link (External Reference)</label>
                             <input
                               name="url"
                               component="input"
                               type="text"
                               onChange={this.urlChangeHandler}
                               placeholder="External url for the item source"
                               required
                             />
                           </div>
                          <div>
                            <label>Title</label>
                            <input
                              name="title"
                              component="input"
                              type="text"
                              onChange={this.titleChangeHandler}
                              placeholder="Awesome title"
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
                              placeholder="Short description for the item"
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
                            <option hidden disabled selected value="">Select a category</option>
                            {this.state.isLoading ? '' : this.state?.uniqueCategories.map((category, i) => <option key={i} value={category}>{category}</option>)}
                            </select>
                          </div>
                          <div>
                            <label>Topic</label>
                            <select
                              name="temas"
                              onChange={this.temasChangeHandler}
                            >
                            <option hidden disabled selected value="">Select a topic</option>
                            {this.state.isLoading ? '' :this.state?.uniqueTopics.map((topic, i) => <option key={i} value={topic}>{topic}</option>)}
                            </select>
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

export default Create;
