const mongoose = require('mongoose');
const publicationInterface = require('./publicationInterface');
const activityInterface = require('./activityInterface');
const commentInterface = require('./commentInterface');
const userInterface = require('./userInterface');
const experienceInterface = require('./experienceInterface');
const languageInterface = require('./languageInterface');

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
  return publicationInterface.insert(publication)
    .then((newPublication)=>{
      let newActivity = {
        user: newPublication.user,
        direction: "OUT",
        caption: "publicationCreated",
        params: null,
        relatedUsers: null,
        publication: newPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      return activityInterface.insert(newActivity);
    });
};

db.patchPublication = (id,fields)=>{
  return publicationInterface.patch(id,fields)
    .then((editedPublication)=>{
      let newActivity = {
        user: editedPublication.user,
        direction: "OUT",
        caption: "publicationEdited",
        params: null,
        relatedUsers: null,
        publication: editedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      return activityInterface.insert(newActivity);
    });
};

db.updatePublication = (publication)=>{
  return publicationInterface.update(publication);
};

db.deletePublications = ()=>{
  return publicationInterface.deleteAll();
};

db.deletePublication = (id)=>{
  return publicationInterface.getOne(id)
    .then((deletedPublication)=>{
      return publicationInterface.deleteOne(id)
      .then(()=>{
        let newActivity = {
          user: deletedPublication.user,
          direction: "OUT",
          caption: "publicationDeleted",
          params: null,
          relatedUsers: null,
          publication: null,
          timestamps: {created: new Date().toISOString(), modified: null},
          seen: true
        };
        return activityInterface.insert(newActivity);
      });
    })
};

db.addPublicationAssessment = (assessment)=>{
  return publicationInterface.addPublicationAssessment(assessment)
    .then((updatedPublication)=>{
      let newOutActivity = {
        user: assessment.user,
        direction: "OUT",
        caption: "publicationAssessmentGiven",
        params: {":number": assessment.value},
        relatedUsers: updatedPublication.user,
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      let newInActivity = {
        user: updatedPublication.user,
        direction: "IN",
        caption: "publicationAssessmentAddedNotification",
        params: {":number": assessment.value},
        relatedUsers: assessment.user,
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: false
      };
      return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)]);
    });
};

db.modifyPublicationAssessment = (assessment)=>{
  return publicationInterface.modifyPublicationAssessment(assessment)
    .then((updatedPublication)=>{
      let newOutActivity = {
        user: assessment.user,
        direction: "OUT",
        caption: "publicationAssessmentModified",
        params: {":number": assessment.value},
        relatedUsers: updatedPublication.user,
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      let newInActivity = {
        user: updatedPublication.user,
        direction: "IN",
        caption: "publicationAssessmentUpdatedNotification",
        params: {":number": assessment.value},
        relatedUsers: assessment.user,
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: false
      };
      return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)]);
  });
};

db.deletePublicationAssessment = (assessment)=>{
  return publicationInterface.deletePublicationAssessment(assessment)
    .then((updatedPublication)=>{
      let newOutActivity = {
        user: assessment.user,
        direction: "OUT",
        caption: "publicationAssessmentDeleted",
        params: null,
        relatedUsers: updatedPublication.user,
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      let newInActivity = {
        user: updatedPublication.user,
        direction: "IN",
        caption: "publicationAssessmentDeletedNotification",
        params: null,
        relatedUsers: assessment.user,
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: false
      };
      return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)]);
  });
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
  return commentInterface.insert(comment)
    .then((response)=>{
      if(comment.parent!=null){
        let newOutActivity = {
          user: comment.user._id,
          direction: "OUT",
          caption: "commentResponseGiven",
          params: null,
          relatedUsers: response.user._id,
          publication: response.publication,
          timestamps: {created: new Date().toISOString(), modified: null},
          seen: true
        };
        let newInActivity = {
          user: response.user._id,
          direction: "IN",
          caption: "commentResponseAddedNotification",
          params: null,
          relatedUsers: comment.user._id,
          publication: response.publication,
          timestamps: {created: new Date().toISOString(), modified: null},
          seen: false
        }; 
      }
      else{
        let newOutActivity = {
          user: comment.user,
          direction: "OUT",
          caption: "publicationCommentGiven",
          params: null,
          relatedUsers: respose.user,
          publication: respose._id,
          timestamps: {created: new Date().toISOString(), modified: null},
          seen: true
        };
        let newInActivity = {
          user: respose.user,
          direction: "IN",
          caption: "publicationCommentAddedNotification",
          params: null,
          relatedUsers: comment.user,
          publication: respose._id,
          timestamps: {created: new Date().toISOString(), modified: null},
          seen: false
        };
      }
    return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)]);
  });  
};

db.updateComment = (comment)=>{
  return commentInterface.update(comment)
    .then((updatedComment)=>{
      return publicationInterface.getOne(updatedComment.publication)
        .then((publication)=>{
          if(comment.parent!=null){
            let newOutActivity = {
              user: comment.user,
              direction: "OUT",
              caption: "commentResponseModified",
              params: null,
              relatedUsers: publication.user,
              publication: publication._id,
              timestamps: {created: new Date().toISOString(), modified: null},
              seen: true
            };
            let newInActivity = {
              user: publication.user._id,
              direction: "IN",
              caption: "commentResponseUpdatedNotification",
              params: null,
              relatedUsers: comment.user,
              publication: publication._id,
              timestamps: {created: new Date().toISOString(), modified: null},
              seen: false
            };
          }
          else{
            let newOutActivity = {
              user: comment.user,
              direction: "OUT",
              caption: "publicationCommentModified",
              params: null,
              relatedUsers: publication.user,
              publication: publication._id,
              timestamps: {created: new Date().toISOString(), modified: null},
              seen: true
            };
            let newInActivity = {
              user: publication.user._id,
              direction: "IN",
              caption: "publicationCommentUpdatedNotification",
              params: null,
              relatedUsers: comment.user,
              publication: publication._id,
              timestamps: {created: new Date().toISOString(), modified: null},
              seen: false
            };
          }
          
          return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)]);
        });
    });  
};

db.deleteComment = (id)=>{
  return commentInterface.getOne(id)
    .then((deletedComment)=>{
      return commentInterface.deleteOne(id)
        .then(()=>{
          return publicationInterface.getOne(deletedComment.publication)
            .then((publication)=>{
              if(deletedComment.parent!=null){
                let newOutActivity = {
                  user: deletedComment.user,
                  direction: "OUT",
                  caption: "commentResponseDeleted",
                  params: null,
                  relatedUsers: publication.user,
                  publication: publication._id,
                  timestamps: {created: new Date().toISOString(), modified: null},
                  seen: true
                };
                let newInActivity = {
                  user: publication.user._id,
                  direction: "IN",
                  caption: "commentResponseDeletedNotification",
                  params: null,
                  relatedUsers: deletedComment.user,
                  publication: publication._id,
                  timestamps: {created: new Date().toISOString(), modified: null},
                  seen: false
                };
              }
              else{
                let newOutActivity = {
                  user: deletedComment.user,
                  direction: "OUT",
                  caption: "publicationCommentDeleted",
                  params: null,
                  relatedUsers: publication.user,
                  publication: publication._id,
                  timestamps: {created: new Date().toISOString(), modified: null},
                  seen: true
                };
                let newInActivity = {
                  user: publication.user._id,
                  direction: "IN",
                  caption: "publicationCommentDeletedNotification",
                  params: null,
                  relatedUsers: deletedComment.user,
                  publication: publication._id,
                  timestamps: {created: new Date().toISOString(), modified: null},
                  seen: false
                };
              }

              return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)]);
            });  
        });  
    });
};

db.getExperience = (id)=>{
  return experienceInterface.getOne(id);
};

db.createExperience = (experience)=>{
  return experienceInterface.insert(experience)
    .then((updatedPublication)=>{
      let newActivity = {
        user: updatedPublication.user,
        direction: "OUT",
        caption: "experienceCreated",
        params: null,
        relatedUsers: null,
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      return activityInterface.insert(newActivity);
    });
};

db.updateExperience = (experience)=>{
  return experienceInterface.update(experience)
    .then((updatedExperience)=>{
      return publicationInterface.getOne(updatedExperience.publication)
        .then((publication)=>{
          let newActivity = {
            user: publication.user,
            direction: "OUT",
            caption: "experienceUpdated",
            params: null,
            relatedUsers: null,
            publication: publication._id,
            timestamps: {created: new Date().toISOString(), modified: null},
            seen: true
          };
          return activityInterface.insert(newActivity);
      });
    });
};

db.deleteExperience = (id)=>{
  return experienceInterface.getOne(id)
    .then((deletedExperience)=>{
      return experienceInterface.deleteOne(id)
        .then(()=>{
          return publicationInterface.getOne(deletedExperience.publication)
            .then((publication)=>{
              let newActivity = {
                user: publication.user,
                direction: "OUT",
                caption: "experienceDeleted",
                params: null,
                relatedUsers: null,
                publication: publication._id,
                timestamps: {created: new Date().toISOString(), modified: null},
                seen: true
              };
              return activityInterface.insert(newActivity);
          });
      });  
    }); 
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
  return userInterface.addFavoritePublication(favorite)
    .then((updatedPublication)=>{        
      let newOutActivity = {
        user: favorite.user,
        direction: "OUT",
        caption: "favoritePublicationAdded",
        params: null,
        relatedUsers: updatedPublication.user,
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      let newInActivity = {
        user: updatedPublication.user,
        direction: "IN",
        caption: "favoritePublicationAddedNotification",
        params: null,
        relatedUsers: favorite.user,
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: false
      };      

      return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)]);
    });  
};

db.removeFavoritePublication = (favorite)=>{
  return userInterface.removeFavoritePublication(favorite)
    .then((updatedPublication)=>{        
      let newOutActivity = {
        user: favorite.user,
        direction: "OUT",
        caption: "favoritePublicationDeleted",
        params: null,
        relatedUsers: updatedPublication.user,
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      let newInActivity = {
        user: updatedPublication.user,
        direction: "IN",
        caption: "favoritePublicationDeletedNotification",
        params: null,
        relatedUsers: favorite.user,
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: false
      };      

      return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)]);
    });   
};

db.addUserFollower = (follower)=>{
  return userInterface.addUserFollower(follower)
    .then((updatedUser)=>{        
      let newOutActivity = {
        user: follower.follower,
        direction: "OUT",
        caption: "userFollowerAdded",
        params: null,
        relatedUsers: follower.followed,
        publication: null,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      let newInActivity = {
        user: follower.followed,
        direction: "IN",
        caption: "userFollowerAddedNotification",
        params: null,
        relatedUsers: follower.follower,
        publication: null,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: false
      };      

      return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)]);
    });   
};

db.removeUserFollower = (follower)=>{
  return userInterface.removeUserFollower(follower)
    .then((updatedUser)=>{        
      let newOutActivity = {
        user: follower.follower,
        direction: "OUT",
        caption: "userFollowerDeleted",
        params: null,
        relatedUsers: follower.followed,
        publication: null,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      let newInActivity = {
        user: follower.followed,
        direction: "IN",
        caption: "userFollowerDeletedNotification",
        params: null,
        relatedUsers: follower.follower,
        publication: null,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: false
      };      

      return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)]);
    });     
};

db.getLanguages = ()=>{
  return languageInterface.getAll();
};

db.getLanguage = (id)=>{
  return languageInterface.getOne(id);
};

module.exports = db;
