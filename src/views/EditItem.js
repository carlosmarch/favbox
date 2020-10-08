import React, { Component } from "react";
import history from '../history';
import * as Helpers from '../Helpers';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Message from '../components/Message';
import {ReactComponent as BackIcon} from '../icons/Back.svg';
import Modal from '../components/Modal';

const recommendationController = require('../controllers/recommendationController.js');

//AIRTABLE HELPERS
const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
const table = base('recommendations');
const tableContributors = base('contributors');


class EditItem extends Component {

  constructor() {
    super();
    this.state = {
      isLoading       : true,//until getting dropdown categories
      isDisabled      : true,
      userId          : [JSON.parse(localStorage.getItem('userSession'))?.id],
      itemId          : decodeURIComponent(window.location.pathname.split("/").pop())
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };

  onClose = e => {
    console.log('app close')
    this.props.show = false;
  };

  titleChangeHandler = (event) => {
    if(event.target.value !== this.state?.itemData.title){
      this.setState({isDisabled: false});
    }else{
      this.setState({isDisabled: true});
    }
    this.setState({title: event.target.value});
  }

  descriptionChangeHandler = (event) => {
    if(event.target.value !== this.state?.itemData.description){
      this.setState({isDisabled: false});
    }else{
      this.setState({isDisabled: true});
    }
    this.setState({description: event.target.value});
  }


  imageUrlChangeHandler = (event) => {
    if(event.target.value !== this.state?.itemData.imageUrl){
      this.setState({isDisabled: false});
    }else{
      this.setState({isDisabled: true});
    }
    this.setState({imageUrl: event.target.value});
  }

  categoriesChangeHandler = (event) => {
    if(event.target.value !== this.state?.itemData.categories){
      this.setState({isDisabled: false});
    }else{
      this.setState({isDisabled: true});
    }
    this.setState({categories: event.target.value});
  }

  topicsChangeHandler = (event) => {
    if(event.target.value !== this.state?.itemData?.topics[0]){
      this.setState({isDisabled: false});
    }else{
      this.setState({isDisabled: true});
    }
    this.setState({topics: [event.target.value]});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({isLoading: true});
    recommendationController.updateItem(this.state)
  }

  handleError(){
    history.push({ pathname: `/item/${this.state.itemId}`, state: { type: 'error', message: 'Can´t edit this item' } })
  }

  handleDelete(){
    recommendationController.deleteItem(this.state)
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    //Search ItemId
    table.find(this.state.itemId, async (err, item) => {
      if (err) {
        console.error(err)
        this.handleError()
        return
      }
      const itemData = item.fields;

      //Search Contributor
      tableContributors.find(itemData.contribuidor, async (err, contributor) => {
        if (err) {
          console.error(err)
          this.handleError()
          return
        }

        contributor.fields['id'] = contributor.id
        const contributorData = contributor.fields;

        console.log()

        //Check if userId is contributor
        if (JSON.stringify(contributorData.id) === JSON.stringify(this.state.userId)){
          //IS publisher go item
          //Ok Set data
          this.setState({
            isLoading        : false,
            itemData         : itemData,
            title            : itemData?.title,
            description      : itemData?.description,
            imageUrl         : itemData?.imageUrl,
            categories       : itemData?.categories,
            topics           : itemData?.topics,
          });
        }else{
          this.handleError()
        }

      });

    });



    if ( !window.$categories || !window.$topics) {
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

  itemPreview(props){
    return (
      <div className="favitem no-b">
        <div className="favitem-image-holder">
        {props?.imageUrl ? <img className="favitem-image-holder-img" src={props?.imageUrl} alt="cover"/> : ''}
        </div>
        <div className="favitem-description">
          <div className="favitem-category badge inline mt-s">{props?.categories ? props?.categories : 'category' }</div>
          { props?.topics ? props?.topics?.map((topic, key) => { return (<div to={ '/topics/' + topic } className="badge badge-outline ml-xxs" key={key}>#{topic}</div>) }) : ''}
          <h6>{props?.title ? props?.title : 'title'}</h6>
          <p className="description-small">{props?.description ? props?.description : 'description'}</p>
        </div>
      </div>
    );
  }



  render() {

    return (
    <div className="app_wrapper editItem_view bg-soft-grey">


      <Modal onClose={this.showModal} show={this.state.show}>
        <h5 className="mb-s">¿Estás seguro?</h5>
        <p>Cuando se elimina un item, la acción no se puede deshacer.</p>
        <div className="actions mt-s flex-evenly">
          <div className="button button-outline mt-s" onClick={this.showModal}>Cancelar</div>
          <div className="button submitbtn mt-s fl-r" onClick={this.handleDelete}>Eliminar</div>
        </div>
      </Modal>


      <Header />

      <div className="global pb-l">
            <div className="container container-xs">

                <div className="back-icon" onClick={this.props.history.goBack}><BackIcon className="" /></div>

                <div className="settings-form-wrapper mt-s card-16 p-m bg-white">

                  <form onSubmit={this.handleSubmit} className="signup-form">
                    <div className="grid">
                           <div className="grid__item width-12/12 width-12/12@m">

                             { history.location.state && this.props.location.state?.message
                               ? <Message type={this.props.location.state.type} message={this.props.location.state.message}/>
                               : '' }

                             <div className="">
                               <h3 className="mb-s">Edit item</h3>
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
                                   defaultValue={this.state.title}
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
                                   defaultValue={this.state.description}
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
                                   defaultValue={this.state.imageUrl}
                                 />
                               </div>
                               <div>
                                 <label>Category</label>
                                 <select id="categorias"
                                   name="categorias"
                                   onChange={this.categoriesChangeHandler}
                                   required
                                 >
                                    <option hidden defaultValue={this.state.categories}>{this.state.categories}</option>
                                    {this.state.isLoading ? '' : this.state?.uniqueCategories?.map((category, i) => <option key={i} value={category}>{category}</option>)}
                                 </select>
                               </div>
                               <div>
                                 <label>Topic</label>
                                 <select id="topics"
                                   name="temas"
                                   onChange={this.topicsChangeHandler}
                                 >
                                    <option hidden defaultValue={this.state.topics}>{this.state.topics}</option>
                                    {this.state.isLoading ? '' :this.state?.uniqueTopics?.map((topic, i) => <option key={i} value={topic}>{topic}</option>)}
                                 </select>
                               </div>
                               <div className="button mt-s" onClick={e => { this.showModal(); }}>Delete</div>
                               <button className="button submitbtn mt-s fl-r" type="submit" disabled={this.state.isDisabled}>{this.state.isLoading ? 'loading' : 'Save'}</button>

                             </div>
                      </div>
                    </div>
                  </form>


                </div>
            </div>
      </div>

      <Footer/>

    </div>
    );
  }
}

export default EditItem;
