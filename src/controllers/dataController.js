//HOW TO USE
//const data = require('./dataController.js');
//data.getAirtableRecords(table, options)


//const cloudinary = require('cloudinary/lib/cloudinary');
//import {Image} from 'cloudinary-react';

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



//CLOUDINARY
// export const uploadToCloudinary = (image) => {
//     console.log(image)
//     cloudinary.config({
//         cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
//         api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
//     });
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader.upload_stream(
//         {
//           resource_type: 'image',
//           width: 800,
//           crop: 'scale',
//           quality: 80
//         },
//         function(error, result){
//           if(error) {
//             reject(error);
//           } else {
//             resolve({"url":result.url});
//           }
//         }
//       ).end(image.buffer);
//     })
// }
