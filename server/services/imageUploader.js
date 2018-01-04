'use strict';
const storage = require('@google-cloud/storage');
const fs = require('fs');

const gcs = storage({
  projectId: 'turinsta-189517',
  keyFilename: '../Turinsta-14582893bb92.json'
});

const bucketName = 'tur0000000001';
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
  console.log("uploadToGcs");
  //console.log("Req: " + JSON.stringify(req));
  
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
