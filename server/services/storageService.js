const db = require('../db/mongo');

let storageService = {};

storageService.connect = ()=>{
  db.connect();
};

storageService.getPublications = (searchParams,count,order)=>{
  return db.getPublications(searchParams,count,order);
};

storageService.getPublication = (id)=>{
  return db.getPublication(id);
};

storageService.createPublication = (publication)=>{
  return db.createPublication(publication);
};

storageService.patchPublication = (id,fields)=>{
  return db.patchPublication(id,fields);
};

storageService.updatePublication = (publication)=>{
  return db.updatePublication(publication);
};

storageService.deletePublication = (id)=>{
  return db.deletePublication(id);
};

storageService.addPublicationAssessment = (assessment)=>{
  return db.addPublicationAssessment(assessment);
};

storageService.modifyPublicationAssessment = (assessment)=>{
  return db.modifyPublicationAssessment(assessment)
};

storageService.deletePublicationAssessment = (assessment)=>{
  return db.deletePublicationAssessment(assessment)
};

storageService.addPublicationImage = (publicationId, imageUrls)=>{
  return db.addPublicationImage(publicationId, imageUrls)
};

storageService.deletePublicationImage = (publicationId, imageUrl)=>{
  return db.deletePublicationImage(publicationId, imageUrl)
};

storageService.getPublicationImage = (publicationId, imageUrl)=>{
  return db.getPublicationImage(publicationId, imageUrl);
};

storageService.getActivities = (userId,filters,limit)=>{
  return db.getActivities(userId,limit);
};

storageService.getActivity = (id)=>{
  return db.getActivity(id);
};

storageService.createActivity = (activity)=>{
  return db.createActivity(activity);
};

storageService.updateActivity = (activity)=>{
  return db.updateActivity(activity);
};

storageService.deleteActivity = (id)=>{
  return db.deleteActivity(id);
};

storageService.getComment = (id)=>{
  return db.getComment(id);
};

storageService.createComment = (comment)=>{
  return db.createComment(comment);
};

storageService.updateComment = (comment)=>{
  return db.updateComment(comment);
};

storageService.deleteComment = (id)=>{
  return db.deleteComment(id);
};

storageService.getExperience = (id)=>{
  return db.getExperience(id);
};

storageService.createExperience = (experience)=>{
  return db.createExperience(experience);
};

storageService.updateExperience = (experience)=>{
  return db.updateExperience(experience);
};

storageService.deleteExperience = (id)=>{
  return db.deleteExperience(id);
};

storageService.getUsers = ()=>{
  return db.getUsers();
};

storageService.getUser = (id)=>{
  return db.getUser(id);
};

storageService.createUser = (user)=>{
  return db.createUser(user);
};

storageService.updateUser = (user)=>{
  return db.updateUser(user);
};

storageService.addFavoritePublication = (favorite)=>{
  return db.addFavoritePublication(favorite);
};

storageService.removeFavoritePublication = (favorite)=>{
  return db.removeFavoritePublication(favorite);
};

storageService.addUserFollower = (follower)=>{
  return db.addUserFollower(follower);
};

storageService.removeUserFollower = (follower)=>{
  return db.removeUserFollower(follower);
};

storageService.removeUnreadMessages = (userId,inboxId)=>{
  return db.removeUnreadMessages(userId,inboxId);
};

storageService.getLanguages = ()=>{
  return db.getLanguages();
};

storageService.getLanguage = (id)=>{
  return db.getLanguage(id);
};

storageService.getInboxes = (user)=>{
  return db.getInboxes(user);
};

storageService.getInbox = (id)=>{
  return db.getInbox(id);
};

storageService.createInbox = (inbox)=>{
  return db.createInbox(inbox);
};

storageService.updateInbox = (inbox)=>{
  return db.updateInbox(inbox);
};

storageService.deleteInbox = (id)=>{
  return db.deleteInbox(id);
};

storageService.saveMessage = (id,message)=>{
  return db.saveMessage(id,message);
};

storageService.changeMessageStatus = (id,messageId,userId,status)=>{
  return db.changeMessageStatus(id,messageId,userId,status);
};

module.exports = storageService;
