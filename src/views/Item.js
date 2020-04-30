import React, { Component } from "react";
import { Link } from 'react-router-dom';
import history from '../history';

import * as Helpers from '../Helpers';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import Like from '../components/Like';
import Contributor from '../components/Contributor';
import {ReactComponent as BackIcon} from '../icons/Back.svg';
import {ReactComponent as WebIcon} from '../icons/Globe.svg';
import {ReactComponent as LikedIcon} from '../icons/HeartFull.svg';

const dataController = require('../controllers/dataController.js');
const userController = require('../controllers/userController.js');

//AIRTABLE HELPERS
const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
const table = base('recommendations');
const tableContributors = base('contributors');

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      urlItemId : decodeURIComponent(window.location.pathname.split("/").pop()),
      itemData  : []
    };
    window.scrollTo(0, 0);
  }

  componentDidMount() {

    table.find(this.state.urlItemId, async (err, item) => {
      if (err) {
        console.error(err)
        return
      }
      const itemData = item.fields;

      tableContributors.find(itemData.contribuidor, async (err, contributor) => {
        if (err) {
          console.error(err)
          return
        }

        const contributorData = contributor?.fields;
        this.setState({
          isLoading        : false,
          itemData         : itemData,
          contributorData  : contributorData,
          isLikedBy        : this.state.itemData.isLikedBy
        });

      });

    });


  }


  render() {
    return (
    <div className="app_wrapper item_view">

      <Header />
      <div className="global">
        <div className="container container-m">
            <div className="back-icon" onClick={this.props.history.goBack}><BackIcon className="" /></div>
            {this.state.isLoading ? <LoadingSpinner /> : this.itemTemplate()}
        </div>
      </div>

      <Footer/>

    </div>
    );
  }

  itemTemplate(){
    return(
      <div className="item-wrapper">
          <div className="item-container mt-s card-16">
            <div className="grid">
                <div className="grid__item width-6/12 width-12/12@m">
                  <img className="item-img" src={this.state.itemData?.imageUrl} alt="cover"/>
                </div>
                <div className="grid__item width-6/12 width-12/12@m">
                  <div className="item-content">

                      <div className="item-content-top">
                        <Like itemId={this.state?.urlItemId}/>
                        <Link to={ '/categorias/' + this.state.itemData?.categorias } className="badge">{this.state.itemData?.categorias}</Link>
                        { this.state.itemData?.temas?.map((topic, key) => { return (<Link to={ '/temas/' + topic } className="badge badge-outline" key={key}>#{topic}</Link>) }) }
                        <h2>{this.state.itemData?.title}</h2>
                        <Contributor contributor={this.state.contributorData} className="no-m"/>
                        <p className="hero-text">{this.state.itemData?.description}</p>
                        {this.state.itemData?.isLikedBy ? this.getIsLikedBy() : ''}
                      </div>

                      <div className="item-content-bottom">
                        <a href={this.state.itemData?.url} target="_blank" rel="noopener noreferrer" className="link-box">
                          <WebIcon className="link-box-icon icon-24 icon-grey" />
                          <div className="link-box-content grey">
                            <span>Website</span>
                            <span>{Helpers.truncateText(this.state.itemData?.url, 40)}</span>
                          </div>
                        </a>
                      </div>

                  </div>
                </div>
            </div>
          </div>
      </div>
    )
  }

  getIsLikedBy(){
    let isLikedArr = this.state.itemData?.isLikedBy.filter(function(person) {return person !== userController.getSession()?.name})
    if (isLikedArr.length === 0) return
    return (
      <div className="is-liked-by">
        <LikedIcon className="icon-14 icon-grey"/>
        {isLikedArr.map((contributor, key) => {
            return (
              <Link to={ '/profile/' + contributor } className="grey underline-hover is-liked-name" key={key}>{contributor}</Link>
            )
          })
        }liked
      </div>
    )
  }


}

export default Item;
