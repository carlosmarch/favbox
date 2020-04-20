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
  console.log('hydrateUserLikes',user)
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
  console.log('hydrateUserPubItems',user)
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
  console.log('findItem', title, url)
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
export const addItem = async (req, next) => {
  console.log('addItem', req)
  const { title, description, url, imageUrl, categorias, contribuidor, temas } = req;
  const itemExists = await findItem(title, url);

  if (itemExists) {
    console.log('itemExists')
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
        return;
      }
      //console.log(record)
      req.id = record.getId();
      //next(req);
    }
  );
};
