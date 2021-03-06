import history from '../history';
const data = require('./dataController.js');

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

export const hydrateUserPubItems = async (user, next) => {
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



//RETURNS BOOLEAN
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
  const { title, description, url, imageUrl, categories, topics, contribuidor } = req;
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
      categories,
      topics,
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
        pathname: '/profile',
        state: { type: 'success',  message: 'Item created succesfully!', action: 'update' }
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
    if (xhr.readyState === 4 && xhr.status === 200) {
      // File uploaded successfully
      var response = JSON.parse(xhr.responseText);
      var url = response.secure_url;
      file.imageUrl = url;
      next(file)//next function addItem
    }
    if (xhr.status === 400) {
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

  }
}

export const uploadAvatarToCloudinary = (file, next) => {
  if(!file.avatar || file.avatar === 'undefined'){
    file.avatar = ''
    next(file)
    return
  }
  var url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload/`;
  var xhr = new XMLHttpRequest();
  var fd = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  fd.append('upload_preset', 'cloudinary_airtable_preset_avatar');
  fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
  fd.append('file', file.avatar);
  xhr.send(fd);
  xhr.onreadystatechange = function(e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // File uploaded successfully
      var response = JSON.parse(xhr.responseText);
      var url = response.secure_url;
      file.avatar = url;
      next(file)//next function updateUserProfile
    }
    if (xhr.status === 400) {
      history.push({
        pathname: '/settings',
        state: { type: 'error', message: 'Something happened. Please try again.'}
      })
    }

  }
}


export const getHydratedFavItems = async (userlikes) => {
  if (!userlikes) userlikes = [];
  let itemsWithDetails = [];
  for( const id of userlikes) {
    itemsWithDetails.push(await getRecommendationById(id))
  }
  return itemsWithDetails
}


export const updateItem = (req) => {
  console.log(req)
  const { title, description, imageUrl, categories, topics } = req;
  const itemId = req?.itemId
  if (!itemId) return;
  table.update( itemId, { title, description, imageUrl, categories, topics }, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Updated', record)
      history.push({
        pathname: '/profile',
        state: {
          type: 'info',
          message: 'Item updated successfully!'
        }
      })
    }
  );

}



export const deleteItem = (req) => {
  const { title, description, imageUrl, categories, topics } = req;
  const itemId = req?.itemId
  //console.log(req, itemId)
  if (!itemId) return;
  table.destroy( itemId, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Updated', record)
      history.push({
        pathname: '/profile',
        state: {
          type: 'info',
          message: 'Item deleted.'
        }
      })
    }
  );

}
