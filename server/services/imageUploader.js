'use strict';
const storage = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '/Turinsta-14582893bb92.json');
console.log(filePath);

const gcs = storage({
  projectId: 'turinsta-189517',
  keyFilename: filePath
});

const bucketName = 'tur0000000001';
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
  // console.log("uploadToGcs");
  //console.log("Req: " + JSON.stringify(req));

  // Note: cache should not be re-used by repeated calls to JSON.stringify.
  // let cache = [];
  // console.log(JSON.stringify(req, function(key, value) {
  //     if (typeof value === 'object' && value !== null) {
  //         if (cache.indexOf(value) !== -1) {
  //             // Circular reference found, discard key
  //             return;
  //         }
  //         // Store value in our collection
  //         cache.push(value);
  //     }
  //     return value;
  // }));
  // cache = null; // Enable garbage collection

  console.log("file: " + req.file);

  if(!req.file) return next();

  // Can optionally add a path to the gcsname below by concatenating it before the filename
  const gcsname = req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    console.log("Upload failed");
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    console.log("Upload finished");
    //console.log("Object: " + JSON.stringify(req.file.cloudStorageObject));
    console.log("Url: " + req.file.cloudStoragePublicUrl);
    next();
  });

  stream.end(req.file.buffer);
};

module.exports = ImgUpload;
