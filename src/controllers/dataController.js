const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
}).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

//HOW TO USE
//const data = require('./dataController.js');
//data.getAirtableRecords(table, options)
export const getAirtableRecords = (table, options) => {
  let records = [];
  const params = {
    view: 'Grid view',
    pageSize: 15,
  };

  Object.assign(params, options);

  return new Promise((resolve, reject) => {
    // Cache results if called already
    if (records.length > 0) {
      resolve(records);
    }

    const processPage = (partialRecords, fetchNextPage) => {
      records = [...records, ...partialRecords];
      fetchNextPage();
    };

    const processRecords = err => {
      if (err) {
        reject(err);
        return;
      }

      resolve(records);
    };

    table.select(params).eachPage(processPage, processRecords);
  });
};
