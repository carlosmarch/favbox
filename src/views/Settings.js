import React, { Component } from "react";
import history from '../history';
import ImageUploader from "react-images-upload";
import $ from 'jquery';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Message from '../components/Message';
import {ReactComponent as BackIcon} from '../icons/Back.svg';

const userController = require('../controllers/userController.js');
const recommendationController = require('../controllers/recommendationController.js');


class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading : false,
      isDisabled: true,
      name: userController.getSession()?.name,
      description: userController.getSession()?.description,
      avatar: userController.getSession()?.avatar
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }


  componentDidMount() {
    //Clear history state messages
    if (history.location.state && history.location.state.message) {
        let state = { ...history.location.state };
        delete state.message
        delete state.type
        history.replace({ ...history.location, state });
    }

    const userId = userController.getSession()?.id;
    if (!userId) {
      userController.signOut()
      return
    }
  }

  nameChangeHandler = (event) => {
    if(event.target.value !== userController.getSession()?.name){
      this.setState({isDisabled: false});
    }else{
      this.setState({isDisabled: true});
    }
    this.setState({name: event.target.value});
  }
  descriptionChangeHandler = (event) => {
    if(event.target.value === ''){
      this.setState({isDisabled: true});
    }
    else if( event.target.value !== userController.getSession()?.description){
      this.setState({isDisabled: false});
    }else{
      this.setState({isDisabled: true});
    }
    this.setState({description: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({isLoading: true});
    if(this.state.avatar === userController.getSession()?.avatar){
      //Dont upload image
      userController.updateUserProfile(this.state)
    }else{
      recommendationController.uploadAvatarToCloudinary(this.state, userController.updateUserProfile) //Upload to cloudinary, then upateUser in airtable
    }
  }

  onDrop(pictureFiles, pictureDataURLs) {
     if(pictureFiles[0] === '' || pictureFiles[0] === undefined){
       this.setState({isDisabled: true});
     }
     else if(pictureFiles[0] !== userController.getSession()?.avatar){
       this.setState({isDisabled: false});
     }else{
       this.setState({isDisabled: true});
     }
     this.setState({avatar: pictureFiles[0]});
   }

   deleteAvatar(){
      $( ".user-has-photo-PictureContainer" ).remove();
   }

   componentWillReceiveProps(nextProps) {
     this.setState({isDisabled: true});
     //@TODO Reload userdata
   }


  render() {

    return (
    <div className="app_wrapper settings_view bg-soft-grey">

      <Header />

      <div className="global pb-l">
            <div className="container container-xs">

                <div className="back-icon" onClick={this.props.history.goBack}><BackIcon className="" /></div>

                <div className="settings-form-wrapper mt-s card-16 p-m bg-white">

                    {history.location.state && this.props.location.state?.message ?
                      <Message type={this.props.location.state.type} message={this.props.location.state.message}/>
                      : ''}

                    <form onSubmit={this.handleSubmit} className="settings-form flex-justify auto">

                      <div className="grid relative">
                        <div className="grid__item width-12/12 width-12/12@m">
                          <h3 className="mb-s">Settings</h3>
                          <h6 className="mb-xs">Profile photo</h6>

                        {userController.getSession()?.avatar ? (
                            <div className="user-has-photo-PictureContainer">
                              <div className="deleteImage" onClick={this.deleteAvatar}>X</div>
                              <img className="user-has-photo-image" src={userController.getSession()?.avatar} alt="user-avatar"/>
                            </div>
                          ) : ''  }


                          <ImageUploader
                            name="avatar"
                            className={'create-item-uploader'}
                            withPreview={true}
                            withIcon={false}
                            singleImage={true}
                            buttonText="Choose image"
                            onChange={this.onDrop}
                            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                            maxFileSize={5242880}
                            defaultValue={userController.getSession()?.avatar}
                          />

                          <h6 className="mt-s mb-xs">Contact information</h6>
                          <div>
                            <label>First Name</label>
                            <input
                              name="name"
                              component="input"
                              type="text"
                              onChange={this.nameChangeHandler}
                              placeholder="Your Name"
                              defaultValue={userController.getSession()?.name}
                            />
                          </div>
                          <div>
                            <label>Tell us about you</label>
                            <textarea
                              name="description"
                              type="text"
                              onChange={this.descriptionChangeHandler}
                              placeholder="Your description"
                              defaultValue={userController.getSession()?.description}
                            />
                          </div>
                          <button className="button submitbtn mt-s" type="submit" disabled={this.state.isDisabled}>{this.state.isLoading ? 'loading' : 'Save'}</button>

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

export default EditProfile;
