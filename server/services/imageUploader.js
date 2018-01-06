'use strict';
const storage = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

const gcs = storage({
  projectId: 'turinsta-189517',
  keyFilename: path.join(__dirname, '/../Turinsta-14582893bb92.json')
});

const bucketName = 'tur0000000001';
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {

  if(!req.files) return next();

  console.log(JSON.stringify(req.files));

  // Can optionally add a path to the gcsname below by concatenating it before the filename

  let gcsname = [];
  let bucketFile = [];
  let stream = [];

  let pending = req.files.length;

  req.files.map((file,i)=>{
    gcsname[i] = file.originalname + '-' + Date.now();
    bucketFile[i] = bucket.file(gcsname);
    stream[i] = bucketFile[i].createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });
    stream[i].on('error', (err) => {
      console.log("Upload failed");
      file.cloudStorageError = err;
      next(err);
    });

    stream[i].on('finish', () => {
      file.cloudStorageObject = gcsname[i];
      file.cloudStoragePublicUrl = getPublicUrl(gcsname[i]);
      console.log("Upload finished");
      console.log("Url: " + file.cloudStoragePublicUrl);
      if(pending==1){
        next();
      }
      else{
        --pending;
      }
    });

    stream[i].end(file.buffer);
  });

  // const gcsname = req.files.originalname + '-' + Date.now();
  // const file = bucket.file(gcsname);

  // const stream = file.createWriteStream({
  //   metadata: {
  //     contentType: req.files.mimetype
  //   }
  // });

  // stream.on('error', (err) => {
  //   console.log("Upload failed");
  //   req.files.cloudStorageError = err;
  //   next(err);
  // });
  //
  // stream.on('finish', () => {
  //   req.file.cloudStorageObject = gcsname;
  //   req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
  //   console.log("Upload finished");
  //   console.log("Url: " + req.file.cloudStoragePublicUrl);
  //   next();
  // });

  // stream.end(req.file.buffer);
};

module.exports = ImgUpload;
