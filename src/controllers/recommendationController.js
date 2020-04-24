import React from 'react';
import history from '../history';
import ReactDOM from 'react-dom';
import * as Helpers from '../Helpers';
const data = require('./dataController.js');
const userController = require('./userController.js');

//AIRTABLE HELPERS
const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
const table = base('recommendations');



//METHODS
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

  const items = await data.getAirtableRecords(table, options);

  items.filter(item => {
    if (item.get('title') === title || item.get('url') === url) {
      return (recordExists = true);
    }
    return (recordExists = false);
  });

  return recordExists;
};


//ITEM MANAGEMENT
export const addItem = async (req) => {
  //console.log('addItem', req)
  const { title, description, url, imageUrl, categorias, temas, contribuidor } = req;
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
      temas,
      contribuidor
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
        pathname: '/create',
        state: { type: 'success',  message: 'Item created succesfully!' }
      })
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
    }
    if (xhr.status == 400) {
      history.push({
        pathname: '/create',
        state: { type: 'error', message: 'Something happened when uploading. Please try again.'}
      })
    }
    //@TODO Look for errors
    // history.push({
    //   pathname: '/create',
    //   state: { type: 'error', message: 'Something happened when uploading. Please try again.'}
    // })

  }.bind(this);
}


//MIXES LOCAL STORAGE ITEMS WITH AIRTABLE LIKES
//THEN UPDATES TABLE AND RETURNS LIKES WITH DETAILS
//@PARAMS Array with like id's
export const getRealFavItems = async (userlikes) => {
  //Get storage favs
  let storageFavs = Helpers.getStorageFavs()
  if (!userlikes) userlikes = [];
  //Get matching
  let matchingFavs = userlikes.filter(recommendation => storageFavs.some(favId => recommendation.id === favId))
  let matchingIds = [];
  matchingFavs.map((item) => matchingIds.push(item.id) )
  //storage + only matching
  let union = [...storageFavs, ...matchingIds];
  let withoutDuplicates = Array.from(new Set(union));
  //console.log('RealFavItems', userlikes, withoutDuplicates )
  let withoutDuplicatesWithDetails = [];
  for( const id of withoutDuplicates) {
    withoutDuplicatesWithDetails.push(await getRecommendationById(id))
  }
  userController.updateUserLikes(withoutDuplicates)
  return withoutDuplicatesWithDetails
}











//GET METADATA
//NOT USED
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
