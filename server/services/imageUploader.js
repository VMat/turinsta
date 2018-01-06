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
const aclOptions = {
  entity: 'allUsers',
  role: storage.acl.READER_ROLE
};
bucket.acl.add(aclOptions, function(err, aclObject) {});
bucket.acl.default.add(aclOptions, function(err, aclObject) {});

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {

  if(!req.files) return next();

  let gcsname = [];
  let bucketFile = [];
  let stream = [];

  let pending = req.files.length;

  req.files.map((file,i)=>{
    gcsname[i] = file.originalname + '-' + Date.now();
    bucketFile[i] = bucket.file(gcsname[i]);
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
      if(pending==1){
        next();
      }
      else{
        --pending;
      }
    });

    stream[i].end(file.buffer);
  });
};

module.exports = ImgUpload;
