const mongoose = require('mongoose');
const publicationInterface = require('./publicationInterface');
const activityInterface = require('./activityInterface');
const commentInterface = require('./commentInterface');
const userInterface = require('./userInterface');
const experienceInterface = require('./experienceInterface');

let db = {};

db.connect = ()=>{

  mongoose.connect(process.env.MONGOLAB_URI, (error)=>{
    if (error)
      console.error(error);
    else
      console.log('mongo connected');
  });
};

db.getPublications = (searchParams,count,order)=>{
  return publicationInterface.getN(searchParams,count,order);
};

db.getPublication = (id)=>{
  return publicationInterface.getOne(id);
};

db.createPublication = (publication)=>{
  return publicationInterface.insert(publication);
};

db.patchPublication = (id,fields)=>{
  return publicationInterface.patch(id,fields)
};

db.updatePublication = (publication)=>{
  return publicationInterface.update(publication);
};

db.deletePublications = ()=>{
  return publicationInterface.deleteAll();
};

db.deletePublication = (id)=>{
  return publicationInterface.deleteOne(id);
};

db.addPublicationAssessment = (assessment)=>{
  return publicationInterface.addPublicationAssessment(assessment);
};

db.modifyPublicationAssessment = (assessment)=>{
  return publicationInterface.modifyPublicationAssessment(assessment);
};

db.deletePublicationAssessment = (assessment)=>{
  return publicationInterface.deletePublicationAssessment(assessment);
};

db.addPublicationImage = (publicationId, imageUrls)=>{
  return publicationInterface.addPublicationImage(publicationId, imageUrls);
};

db.deletePublicationImage = (publicationId, imageUrl)=>{
  return publicationInterface.deletePublicationImage(publicationId, imageUrl);
};

db.getPublicationImage = (publicationId, imageUrl)=>{
  return publicationInterface.getPublicationImage(publicationId, imageUrl);
};

db.getActivities = ()=>{
  return activityInterface.getAll();
};

db.getActivity = (id)=>{
  return activityInterface.getOne(id);
};

db.createActivity = (activity)=>{
  return activityInterface.insert(activity);
};

db.updateActivity = (activity)=>{
  return activityInterface.update(activity);
};

db.deleteActivity = (id)=>{
  return activityInterface.deleteOne(id);
};

db.getComment = (id)=>{
  return commentInterface.getOne(id);
};

db.createComment = (comment)=>{
  return commentInterface.insert(comment);
};

db.updateComment = (comment)=>{
  return commentInterface.update(comment);
};

db.deleteComment = (id)=>{
  return commentInterface.deleteOne(id);
};

db.getExperience = (id)=>{
  return experienceInterface.getOne(id);
};

db.createExperience = (experience)=>{
  return experienceInterface.insert(experience);
};

db.updateExperience = (experience)=>{
  return experienceInterface.update(experience);
};

db.deleteExperience = (id)=>{
  return experienceInterface.deleteOne(id);
};

db.getUsers = ()=>{
  return userInterface.getAll();
};

db.getUser = (id)=>{
  return userInterface.getOne(id);
};

db.createUser = (user)=>{
  return userInterface.insert(user);
};

db.updateUser = (user)=>{
  return userInterface.update(user);
};

db.addFavoritePublication = (favorite)=>{
  return userInterface.addFavoritePublication(favorite);
};

db.removeFavoritePublication = (favorite)=>{
  return userInterface.removeFavoritePublication(favorite);
};

db.addUserFollower = (follower)=>{
  return userInterface.addUserFollower(follower);
};

db.removeUserFollower = (follower)=>{
  return userInterface.removeUserFollower(follower);
};

module.exports = db;
