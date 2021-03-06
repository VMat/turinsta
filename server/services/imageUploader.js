'use strict';
const storage = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

const gcs = storage({
  projectId: 'turinsta-189517',
  keyFilename: path.join(__dirname, '/../Turinsta-14582893bb92.json')
});

const aclOptions = {
  entity: 'allUsers',
  role: storage.acl.READER_ROLE
};

let bucketName = null;
let bucket = null;

function getPublicUrl(filename) {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename;
}

let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
  const publicationService = require('./publicationService');

  if(!req.files) return next();
  publicationService.getPublication(req.params.publication)
    .then((publication)=>{
      bucketName = publication.user.bucketId;
      bucket = gcs.bucket(bucketName);
      bucket.acl.default.add(aclOptions, (err, aclObject)=>{});

      let gcsname = [];
      let bucketFile = [];
      let stream = [];

      let pending = req.files.length;

      req.files.map((file,i)=>{
        gcsname[i] = publication._id + '-' + Date.now();
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
    })
};

ImgUpload.genericUploadToGcs = (req, res, next) => {

  const userService = require('./userService');

  if(!req.files) return next();

  userService.getUser(req.params.user,{bucketId: 1})
    .then((user)=>{
      bucketName = user.bucketId;
      bucket = gcs.bucket(bucketName);
      bucket.acl.default.add(aclOptions, (err, aclObject)=>{});

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
    });
};

ImgUpload.removeFromGcs = (bucketId,imageUrl)=>{
  bucketName = bucketId;
  bucket = gcs.bucket(bucketName);
  let parsedUrl = imageUrl.split("/");
  let file = bucket.file(parsedUrl[parsedUrl.length-1]);
  return file.delete();
};

module.exports = ImgUpload;
