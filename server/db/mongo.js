const mongoose = require('mongoose');
const publicationInterface = require('./publicationInterface');
const activityInterface = require('./activityInterface');
const commentInterface = require('./commentInterface');
const userInterface = require('./userInterface');
const experienceInterface = require('./experienceInterface');
const languageInterface = require('./languageInterface');
const inboxInterface = require('./inboxInterface');
const NotificationService = require('../services/notificationService');

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
        params: {":user": updatedPublication.user, ":number": assessment.value},
        relatedUsers: [updatedPublication.user],
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      let newInActivity = {
        user: updatedPublication.user,
        direction: "IN",
        caption: "publicationAssessmentAddedNotification",
        params: {":user": assessment.user, ":number": assessment.value},
        relatedUsers: [assessment.user],
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: false
      };
      return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)])
        .then(()=>{
          return userInterface.getOne(updatedPublication.user)
            .then((targetUser)=>{
              return languageInterface.getCaption(targetUser.language,["publicationAssessmentAddedNotification"])
                .then((caption)=>{
                  return languageInterface.getCaption(targetUser.language,["summaryTextNotification"])
                    .then((summaryCaption)=>{
                      return userInterface.getOne(assessment.user)
                        .then((sender)=>{
                          let title = caption.replace(':user', sender.username).replace(':number', assessment.value);
                          let notification = {title: title, body: '', summaryText: summaryCaption};
                          let data = {type: 'publication', category: updatedPublication._id, key: ''};
                          return NotificationService.send({notification: notification, data: data},[targetUser.notificationKey])
                            .then(()=>{
                              return Promise.resolve(targetUser);
                            });
                        });
                    });
                });
            });
        });
    });
};

db.modifyPublicationAssessment = (assessment)=>{
  return publicationInterface.modifyPublicationAssessment(assessment)
    .then((updatedPublication)=>{
      let newOutActivity = {
        user: assessment.user,
        direction: "OUT",
        caption: "publicationAssessmentModified",
        params: {":user": updatedPublication.user, ":number": assessment.value},
        relatedUsers: [updatedPublication.user],
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      let newInActivity = {
        user: updatedPublication.user,
        direction: "IN",
        caption: "publicationAssessmentUpdatedNotification",
        params: {":user": assessment.user, ":number": assessment.value},
        relatedUsers: [assessment.user],
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: false
      };
      return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)])
        .then(()=>{
          console.log("promise all");
          return userInterface.getOne(updatedPublication.user)
            .then((targetUser)=>{
              console.log("targetUser: " + JSON.stringify(targetUser));
              return languageInterface.getCaption(targetUser.language,["publicationAssessmentUpdatedNotification"])
                .then((caption)=>{
                  return languageInterface.getCaption(targetUser.language,["summaryTextNotification"])
                    .then((summaryCaption)=>{
                      return userInterface.getOne(assessment.user)
                        .then((sender)=>{
                          let title = caption.replace(':user', sender.username).replace(':number', assessment.value);
                          let notification = {title: title, body: '', summaryText: summaryCaption};
                          let data = {type: 'publication', category: updatedPublication._id, key: ''};
                          console.log("publication modified: " + JSON.stringify(notification));
                          console.log("publication data: " + JSON.stringify(data));
                          return NotificationService.send({notification: notification, data: data},[targetUser.notificationKey])
                            .then(()=>{
                              return Promise.resolve(targetUser);
                            });
                        });
                    });
                });
            });
        });
  });
};

db.deletePublicationAssessment = (assessment)=>{
  return publicationInterface.deletePublicationAssessment(assessment)
    .then((updatedPublication)=>{
      let newOutActivity = {
        user: assessment.user,
        direction: "OUT",
        caption: "publicationAssessmentDeleted",
        params: {":user": updatedPublication.user},
        relatedUsers: [updatedPublication.user],
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      let newInActivity = {
        user: updatedPublication.user,
        direction: "IN",
        caption: "publicationAssessmentDeletedNotification",
        params: {":user":assessment.user},
        relatedUsers: [assessment.user],
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: false
      };
      return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)])
        .then(()=>{
          return userInterface.getOne(updatedPublication.user)
            .then((targetUser)=>{
              return languageInterface.getCaption(targetUser.language,["publicationAssessmentDeletedNotification"])
                .then((caption)=>{
                  return languageInterface.getCaption(targetUser.language,["summaryTextNotification"])
                    .then((summaryCaption)=>{
                      return userInterface.getOne(assessment.user)
                        .then((sender)=>{
                          let title = caption.replace(':user', sender.username);
                          let notification = {title: title, body: '', summaryText: summaryCaption};
                          let data = {type: 'publication', category: updatedPublication._id, key: ''};
                          return NotificationService.send({notification: notification, data: data},[targetUser.notificationKey])
                            .then(()=>{
                              return Promise.resolve(targetUser)
                            })
                        });
                    });
                });
            });
        });
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

db.getActivities = (userId,filters,limit)=>{
  return activityInterface.getN(userId,filters,limit);
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
      return publicationInterface.getOne(response.publication)
        .then((publication)=>{
          if(response.parent!=null){
            let newOutActivity = {
              user: comment.user,
              direction: "OUT",
              caption: "commentResponseGiven",
              params: {":user": response.user._id},
              relatedUsers: [response.user._id],
              publication: response.publication,
              timestamps: {created: new Date().toISOString(), modified: null},
              seen: true
            };
            let newInActivity = {
              user: response.user._id,
              direction: "IN",
              caption: "commentResponseAddedNotification",
              params: {":user": comment.user},
              relatedUsers: [comment.user],
              publication: response.publication,
              timestamps: {created: new Date().toISOString(), modified: null},
              seen: false
            };
            return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)])
              .then(()=>{
                return userInterface.getOne(response.user._id)
                  .then((targetUser)=>{
                    return languageInterface.getCaption(targetUser.language,["commentResponseAddedNotification"])
                      .then((caption)=>{
                        return languageInterface.getCaption(targetUser.language,["summaryTextNotification"])
                          .then((summaryCaption)=>{
                            let title = caption.replace(':user', comment.user.username);
                            let notification = {title: title, body: '', summaryText: summaryCaption};
                            let data = {type: 'comment', category: response.publication, key: response._id};
                            return NotificationService.send({notification: notification, data: data},[targetUser.notificationKey])
                              .then(()=>{
                                return userInterface.getOne(publication.user._id)
                                  .then((publicationUser)=>{
                                    return languageInterface.getCaption(publicationUser.language,["commentResponseAddedNotification"])
                                      .then((publicationUserCaption)=>{
                                        return languageInterface.getCaption(publicationUser.language,["summaryTextNotification"])
                                          .then((PublicationUserSummaryCaption)=>{
                                            let PUTitle = publicationUserCaption.replace(':user', comment.user.username);
                                            let PUNotification = {title: PUTitle, body: '', summaryText: PublicationUserSummaryCaption};
                                            let PUData = {type: 'comment', category: publication._id, key: response._id};
                                            return NotificationService.send({notification: PUNotification, data: PUData},[publicationUser.notificationKey])
                                              .then(()=>{
                                                return Promise.resolve(response);
                                              });
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  })
              });
          }
          else{
            let newOutActivity = {
              user: comment.user,
              direction: "OUT",
              caption: "publicationCommentGiven",
              params: {":user": publication.user._id},
              relatedUsers: [publication.user._id],
              publication: publication._id,
              timestamps: {created: new Date().toISOString(), modified: null},
              seen: true
            };
            let newInActivity = {
              user: publication.user._id,
              direction: "IN",
              caption: "publicationCommentAddedNotification",
              params: {":user": comment.user},
              relatedUsers: [comment.user],
              publication: publication._id,
              timestamps: {created: new Date().toISOString(), modified: null},
              seen: false
            };
            return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)])
              .then(()=>{
                return userInterface.getOne(publication.user._id)
                  .then((targetUser)=>{
                    return languageInterface.getCaption(targetUser.language,["publicationCommentAddedNotification"])
                      .then((caption)=>{
                        return languageInterface.getCaption(targetUser.language,["summaryTextNotification"])
                          .then((summaryCaption)=>{
                            let title = caption.replace(':user', comment.user.username);
                            let notification = {title: title, body: '', summaryText: summaryCaption};
                            let data = {type: 'comment', category: response.publication, key: publication._id};
                            console.log("Enviando notificación");
                            return NotificationService.send({notification: notification, data: data},[targetUser.notificationKey])
                              .then(()=>{
                                console.log("Notificación enviada: " + JSON.stringify(response));
                                return Promise.resolve(response)
                              });
                          });
                      });
                  });
              });
          }
        });
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
              params: {":user": publication.user},
              relatedUsers: [publication.user],
              publication: publication._id,
              timestamps: {created: new Date().toISOString(), modified: null},
              seen: true
            };
            let newInActivity = {
              user: publication.user._id,
              direction: "IN",
              caption: "commentResponseUpdatedNotification",
              params: {":user": comment.user},
              relatedUsers: [comment.user],
              publication: publication._id,
              timestamps: {created: new Date().toISOString(), modified: null},
              seen: false
            };
            return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)])
              .then(()=>{
                return userInterface.getOne(publication.user._id)
                  .then((targetUser)=>{
                    return languageInterface.getCaption(targetUser.language,["commentResponseUpdatedNotification"])
                      .then((caption)=>{
                        return languageInterface.getCaption(targetUser.language,["summaryTextNotification"])
                          .then((summaryCaption)=>{
                            return userInterface.getOne(comment.user)
                              .then((sender)=>{
                                let title = caption.replace(':user', sender.username);
                                let notification = {title: title, body: '', summaryText: summaryCaption};
                                let data = {type: 'comment', category: publication._id, key: updatedComment._id};
                                return NotificationService.send({notification: notification, data: data},[targetUser.notificationKey])
                                  .then(()=>{
                                    return userInterface.getOne(publication.user._id)
                                      .then((publicationUser)=>{
                                        return languageInterface.getCaption(publicationUser.language,["commentResponseUpdatedNotification"])
                                          .then((publicationUserCaption)=>{
                                            return languageInterface.getCaption(publicationUser.language,["summaryTextNotification"])
                                              .then((PublicationUserSummaryCaption)=>{
                                                let PUTitle = publicationUserCaption.replace(':user', comment.user.username);
                                                let PUNotification = {title: PUTitle, body: '', summaryText: PublicationUserSummaryCaption};
                                                let PUData = {type: 'comment', category: publication._id, key: updatedComment._id};
                                                return NotificationService.send({notification: PUNotification, data: PUData},[publicationUser.notificationKey])
                                                  .then(()=>{
                                                    return Promise.resolve(updatedComment);
                                                  });
                                              });
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          }
          else{
            let newOutActivity = {
              user: comment.user,
              direction: "OUT",
              caption: "publicationCommentModified",
              params: {":user": publication.user},
              relatedUsers: [publication.user],
              publication: publication._id,
              timestamps: {created: new Date().toISOString(), modified: null},
              seen: true
            };
            let newInActivity = {
              user: publication.user._id,
              direction: "IN",
              caption: "publicationCommentUpdatedNotification",
              params: {":user": comment.user},
              relatedUsers: [comment.user],
              publication: publication._id,
              timestamps: {created: new Date().toISOString(), modified: null},
              seen: false
            };
            return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)])
              .then(()=>{
                return userInterface.getOne(publication.user._id)
                  .then((targetUser)=>{
                    return languageInterface.getCaption(targetUser.language,["publicationCommentUpdatedNotification"])
                      .then((caption)=>{
                        return languageInterface.getCaption(targetUser.language,["summaryTextNotification"])
                          .then((summaryCaption)=>{
                            return userInterface.getOne(comment.user)
                              .then((sender)=>{
                                let title = caption.replace(':user', sender.username);
                                let notification = {title: title, body: '', summaryText: summaryCaption};
                                let data = {type: 'comment', category: publication._id, key: updatedComment._id};
                                return NotificationService.send({notification: notification, data: data},[targetUser.notificationKey])
                                  .then(()=>{
                                    return Promise.resolve(updatedComment);
                                  });
                              });
                          });
                      });
                  });
              });
          }
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
                  params: {":user": publication.user},
                  relatedUsers: [publication.user],
                  publication: publication._id,
                  timestamps: {created: new Date().toISOString(), modified: null},
                  seen: true
                };
                let newInActivity = {
                  user: publication.user._id,
                  direction: "IN",
                  caption: "commentResponseDeletedNotification",
                  params: {":user": deletedComment.user},
                  relatedUsers: [deletedComment.user],
                  publication: publication._id,
                  timestamps: {created: new Date().toISOString(), modified: null},
                  seen: false
                };
                return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)]);
              }
              else{
                let newOutActivity = {
                  user: deletedComment.user,
                  direction: "OUT",
                  caption: "publicationCommentDeleted",
                  params: {":user": publication.user},
                  relatedUsers: [publication.user],
                  publication: publication._id,
                  timestamps: {created: new Date().toISOString(), modified: null},
                  seen: true
                };
                let newInActivity = {
                  user: publication.user._id,
                  direction: "IN",
                  caption: "publicationCommentDeletedNotification",
                  params: {":user": deletedComment.user},
                  relatedUsers: [deletedComment.user],
                  publication: publication._id,
                  timestamps: {created: new Date().toISOString(), modified: null},
                  seen: false
                };
                return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)]);
              }
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

db.getUser = (id,fields)=>{
  return userInterface.getOne(id,fields);
};

db.getFollowedes = (id,count)=>{
  return userInterface.getFollowedes(id,count);
};

db.createUser = (user)=>{
  return userInterface.insert(user);
};

db.updateUser = (user)=>{
  return userInterface.update(user);
};

db.patchUser = (user)=>{
  return userInterface.patch(user);
};

db.addFavoritePublication = (favorite)=>{
  return userInterface.addFavoritePublication(favorite)
    .then((updatedPublication)=>{
      let newOutActivity = {
        user: favorite.user,
        direction: "OUT",
        caption: "favoritePublicationAdded",
        params: {":user": updatedPublication.user},
        relatedUsers: [updatedPublication.user],
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      let newInActivity = {
        user: updatedPublication.user,
        direction: "IN",
        caption: "favoritePublicationAddedNotification",
        params: {":user": favorite.user},
        relatedUsers: [favorite.user],
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: false
      };

      userInterface.getOne(updatedPublication.user)
      .then((targetUser)=>{
        languageInterface.getCaption(targetUser.language,["favoritePublicationAddedNotification"])
        .then((caption)=>{
          languageInterface.getCaption(targetUser.language,["summaryTextNotification"])
            .then((summaryCaption)=>{
              userInterface.getOne(favorite.user)
              .then((sender)=>{
                let title = caption.replace(':user', sender.username);
                let notification = {title: title, body: '', summaryText: summaryCaption};
                let data = {type: 'publication', category: updatedPublication._id, key: ''};
                NotificationService.send({notification: notification, data: data},[targetUser.notificationKey]);
              });
            });
        });
      });

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
        params: {":user": updatedPublication.user},
        relatedUsers: [updatedPublication.user],
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      let newInActivity = {
        user: updatedPublication.user,
        direction: "IN",
        caption: "favoritePublicationDeletedNotification",
        params: {":user": favorite.user},
        relatedUsers: [favorite.user],
        publication: updatedPublication._id,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: false
      };

      userInterface.getOne(updatedPublication.user)
      .then((targetUser)=>{
        languageInterface.getCaption(targetUser.language,["favoritePublicationDeletedNotification"])
        .then((caption)=>{
          languageInterface.getCaption(targetUser.language,["summaryTextNotification"])
            .then((summaryCaption)=>{
              userInterface.getOne(favorite.user)
              .then((sender)=>{
                let title = caption.replace(':user', sender.username);
                let notification = {title: title, body: '', summaryText: summaryCaption};
                let data = {type: 'publication', category: updatedPublication._id, key: ''};
                NotificationService.send({notification: notification, data: data},[targetUser.notificationKey]);
              });
            });
        });
      });

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
        params: {":user": follower.followed},
        relatedUsers: [follower.followed],
        publication: null,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      let newInActivity = {
        user: follower.followed,
        direction: "IN",
        caption: "userFollowerAddedNotification",
        params: {":user": follower.follower},
        relatedUsers: [follower.follower],
        publication: null,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: false
      };

      userInterface.getOne(follower.followed)
      .then((targetUser)=>{
        languageInterface.getCaption(targetUser.language,["userFollowerAddedNotification"])
        .then((caption)=>{
          languageInterface.getCaption(targetUser.language,["summaryTextNotification"])
            .then((summaryCaption)=>{
              userInterface.getOne(follower.follower)
              .then((sender)=>{
                let title = caption.replace(':user', sender.username);
                let notification = {title: title, body: '', summaryText: summaryCaption};
                let data = {type: 'user', category: follower.follower, key: ''};
                NotificationService.send({notification: notification, data: data},[targetUser.notificationKey]);
              });
            });
        });
      });

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
        params: {":user": follower.followed},
        relatedUsers: [follower.followed],
        publication: null,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: true
      };
      let newInActivity = {
        user: follower.followed,
        direction: "IN",
        caption: "userFollowerDeletedNotification",
        params: {":user": follower.follower},
        relatedUsers: [follower.follower],
        publication: null,
        timestamps: {created: new Date().toISOString(), modified: null},
        seen: false
      };

      userInterface.getOne(follower.followed)
      .then((targetUser)=>{
        languageInterface.getCaption(targetUser.language,["userFollowerDeletedNotification"])
        .then((caption)=>{
          languageInterface.getCaption(targetUser.language,["summaryTextNotification"])
            .then((summaryCaption)=>{
              userInterface.getOne(follower.follower)
              .then((sender)=>{
                let title = caption.replace(':user', sender.username);
                let notification = {title: title, body: '', summaryText: summaryCaption};
                let data = {type: 'user', category: follower.follower, key: ''};
                NotificationService.send({notification: notification, data: data},[targetUser.notificationKey]);
              });
            });
        });
      });

      return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)]);
    });
};

db.removeUnreadMessages = (userId,inboxId)=>{
  return userInterface.removeUnreadMessages(userId,inboxId);
};

db.getLanguages = ()=>{
  return languageInterface.getAll();
};

db.getLanguage = (id)=>{
  return languageInterface.getOne(id);
};

db.getCaption = (language,captionKeys)=>{
  return languageInterface.getCaption(language,captionKeys);
};

db.getInboxes = (user)=>{
  return inboxInterface.getN(user);
};

db.getInbox = (id)=>{
  return inboxInterface.getOne(id);
};

db.createInbox = (inbox)=>{
  inbox.timestamps = {created: new Date().toISOString(), modified: null};
  return inboxInterface.insert(inbox);
};

db.updateInbox = (inbox)=>{
  return inboxInterface.update(inbox);
};

db.deleteInbox = (id)=>{
  return inboxInterface.deleteOne(id);
};

db.saveMessage = (id,message)=>{
  return inboxInterface.saveMessage(id,message);
};

db.changeMessageStatus = (id,messageId,userId,status)=>{
  return inboxInterface.changeMessageStatus(id,messageId,userId,status);
};

module.exports = db;
