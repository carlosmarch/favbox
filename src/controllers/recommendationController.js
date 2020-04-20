const data = require('./dataController.js');

const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);
const table = base('recommendations');



//////RecommendationController
//////Get likes from user
//////Get likes id and call base for his full data


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
  let likeIds = user.likes;
  let recommendationsWithDetails = [];
  for( const id of likeIds) {
    recommendationsWithDetails.push(await getRecommendationById(id))
  }
  user.likes = recommendationsWithDetails;
  return user;
}
