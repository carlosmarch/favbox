import React from 'react';
import history from '../history';
import ReactDOM from 'react-dom';

const data = require('./dataController.js');

//AIRTABLE HELPERS
const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
const table = base('recommendations');


export const getRecommendationById = (id) => {
  return new Promise((resolve, reject) => {
    const processRecord = (err, record) => {
      if (err) {
        reject(err);
        return;
      }
      const id = { id:record.id };
      const fields = record.fields;
      record = {...id, ...fields};
      resolve(record);
    };
    base('recommendations').find(id, processRecord);
  });
}

export const hydrateUserLikes = async (user) => {
  //console.log('hydrateUserLikes',user)
  let likeIds = user.likes;
  let recommendationsWithDetails = [];
  if (!likeIds) return [];
  for( const id of likeIds) {
    recommendationsWithDetails.push(await getRecommendationById(id))
  }
  user.likes = recommendationsWithDetails;
  return user;
}

export const hydrateUserPubItems = async (user) => {
  //console.log('hydrateUserPubItems',user)
  let pubitemIds = user.items;
  let pubitemWithDetails = [];
  if (!pubitemIds) return [];
  for( const id of pubitemIds) {
    pubitemWithDetails.push(await getRecommendationById(id))
  }
  user.items = pubitemWithDetails;
  return user;
}



//CREATE ITEM
const findItem = async (title, url) => {
  //console.log('findItem', title, url)
  let recordExists = false;
  let options = {};
  if (title && url) {
    options = {
      filterByFormula: `OR(title = '${title}', url = '${url}')`
    };
  } else {
    options = {
      filterByFormula: `OR(title = '${title}', url = '${title}')`
    };
  }

  const users = await data.getAirtableRecords(table, options);

  users.filter(user => {
    if (user.get('title') === title || user.get('url') === url) {
      return (recordExists = true);
    }
    return (recordExists = false);
  });

  return recordExists;
};


//ITEM MANAGEMENT
export const addItem = async (req) => {
  //console.log('addItem', req)
  const { title, description, url, imageUrl, categorias, contribuidor, temas } = req;
  const itemExists = await findItem(title, url);

  if (itemExists) {
    console.log('itemExists')
    history.push({
      pathname: '/create',
      state: { type: 'error', message: 'It seems that it already exists. Please try again with another one.' }
    })
    return;
  }

  table.create(
    {
      title,
      description,
      url,
      imageUrl,
      categorias,
      contribuidor,
      temas
    },
    function(err, record) {
      if (err) {
        console.error(err);
        history.push({
          pathname: '/create',
          state: { type: 'error', message: 'Something happened when uploading. Please try again.' }
        })
        return;
      }
      //console.log(record)
      req.id = record.getId();
      //Success creating item!
      history.push({
        pathname: '/profile',
        state: { type: 'success',  message: 'Item created succesfully!' }
      })

    }
  );
};



export const uploadToCloudinary = (file, next) => {
  var url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`;
  var xhr = new XMLHttpRequest();
  var fd = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  fd.append('upload_preset', 'cloudinary_airtable_preset');
  fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
  fd.append('file', file.imageUrl);
  xhr.send(fd);
  xhr.onreadystatechange = function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // File uploaded successfully
      var response = JSON.parse(xhr.responseText);
      var url = response.secure_url;
      file.imageUrl = url;
      next(file)//next function add item
    }else{
      history.push({
        pathname: '/create',
        state: { type: 'error', message: 'Something happened when uploading. Please try again.'}
      })
    }
  }.bind(this);
}



//remove
const getMeta = () => {
  fetch('https://cors-anywhere.herokuapp.com/' + 'https://ggili.com/aprendiendo-de-las-vegas-libro-2856.html')
    .then(res => {
      console.log('HEYYY', res, res.method)
    });
}

const doCORSRequest = (options, printResult) => {

  var x = new XMLHttpRequest();
  x.open(options.method, 'https://cors-anywhere.herokuapp.com/' + 'https://ggili.com/aprendiendo-de-las-vegas-libro-2856.html' );
  x.onload = x.onerror = function() {
    printResult(
      options.method + ' ' + options.url + '\n' +
      x.status + ' ' + x.statusText + '\n\n' +
      (x.responseText || '')
    );
  };
  x.send(options.data);
}
