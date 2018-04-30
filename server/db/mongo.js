const mongoose = require('mongoose');
const publicationInterface = require('./publicationInterface');
const activityInterface = require('./activityInterface');
const commentInterface = require('./commentInterface');
const userInterface = require('./userInterface');
const experienceInterface = require('./experienceInterface');
const languageInterface = require('./languageInterface');
const inboxInterface = require('./inboxInterface');
const placeInterface = require('./placeInterface');
const complaintInterface = require('./complaintInterface');
const NotificationService = require('../services/notificationService');
const ImageUploader = require('../services/imageUploader');

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
      return userInterface.getOne(newPublication.user)
        .then((user)=>{
          user.publications.push(newPublication._id);
          return userInterface.update(user)
            .then(()=>{
              return placeInterface.insert(newPublication)
                .then(()=>{
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
                  return activityInterface.insert(newActivity)
                    .then(()=>{
                      return Promise.resolve(newPublication)
                    });
                });
            })
        });
    });
};

db.patchPublication = (id,fields)=>{
  return publicationInterface.patch(id,fields)
    .then((editedPublication)=>{
      if(fields.hasOwnProperty('places')){
        return placeInterface.delete(editedPublication)
          .then(()=>{
            return placeInterface.insert({...editedPublication, _id: id, places: fields.places})
              .then(()=>{
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
              })
            })
      }
      else{
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
      }
    });
};

db.updatePublication = (publication)=>{
  return publicationInterface.update(publication);
};

db.deletePublication = (id)=>{
  return publicationInterface.getOne(id)
    .then((deletedPublication)=>{
      return placeInterface.delete(deletedPublication)
        .then(()=>{
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
        });
    });
};

db.addPublicationAssessment = (assessment)=>{
  return publicationInterface.addPublicationAssessment(assessment)
    .then((updatedPublication)=>{
      return userInterface.updateScore(updatedPublication.user)
        .then(()=>{
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
    })
};

db.modifyPublicationAssessment = (assessment)=>{
  return publicationInterface.modifyPublicationAssessment(assessment)
    .then((updatedPublication)=>{
      return userInterface.updateScore(updatedPublication.user)
        .then(()=>{
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
    });
};

db.deletePublicationAssessment = (assessment)=>{

  return publicationInterface.deletePublicationAssessment(assessment)
    .then((updatedPublication)=>{
      return userInterface.updateScore(updatedPublication.user)
        .then(()=>{
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
    .then((insertedComment)=>{
      return userInterface.getOne(insertedComment.user)
        .then((commenter)=>{
          return publicationInterface.getOne(insertedComment.publication)
            .then((publication)=>{
              if(insertedComment.parent != null) {
                return commentInterface.getOne(insertedComment.parent)
                  .then((parentComment)=>{
                    if(parentComment.user._id.equals(insertedComment.user)){
                      if(publication.user._id.equals(insertedComment.user)){
                        let newOutActivity = {
                          user: insertedComment.user,
                          direction: "OUT",
                          caption: "responseGivenInOwnCommentInOwnPublication",
                          params: {},
                          relatedUsers: [],
                          publication: insertedComment.publication,
                          timestamps: {created: new Date().toISOString(), modified: null},
                          seen: true
                        };
                        return activityInterface.insert(newOutActivity)
                          .then(()=>{
                            return Promise.resolve(insertedComment);
                          });
                      }
                      else{
                        let newOutActivity = {
                          user: insertedComment.user,
                          direction: "OUT",
                          caption: "responseGivenInOwnCommentInForeignPublication",
                          params: {":user": publication.user._id},
                          relatedUsers: [publication.user._id],
                          publication: insertedComment.publication,
                          timestamps: {created: new Date().toISOString(), modified: null},
                          seen: true
                        };
                        let newInActivity = {
                          user: publication.user._id,
                          direction: "IN",
                          caption: "responseReceivedInMyPublication",
                          params: {":user": insertedComment.user},
                          relatedUsers: [insertedComment.user],
                          publication: insertedComment.publication,
                          timestamps: {created: new Date().toISOString(), modified: null},
                          seen: false
                        };
                        return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)])
                          .then(()=>{
                            return languageInterface.getCaption(publication.user.language,["responseReceivedInMyPublication"])
                              .then((caption)=>{
                                return languageInterface.getCaption(publication.user.language,["summaryTextNotification"])
                                  .then((summaryCaption)=>{
                                    let title = caption.replace(':user', commenter.username);
                                    let notification = {title: title, body: '', summaryText: summaryCaption};
                                    let data = {type: 'comment', category: publication._id, key: insertedComment._id};
                                    return NotificationService.send({notification: notification, data: data},[publication.user.notificationKey])
                                      .then(()=>{
                                        return Promise.resolve(insertedComment)
                                      });
                                  });
                              });
                          });
                      }
                    }
                    else {
                      if(publication.user._id.equals(insertedComment.user)){
                        let newOutActivity = {
                          user: insertedComment.user,
                          direction: "OUT",
                          caption: "responseGivenInForeignCommentInOwnPublication",
                          params: {":user": parentComment.user._id},
                          relatedUsers: [parentComment.user._id],
                          publication: insertedComment.publication,
                          timestamps: {created: new Date().toISOString(), modified: null},
                          seen: true
                        };
                        let newInActivity = {
                          user: parentComment.user._id,
                          direction: "IN",
                          caption: "responseReceived",
                          params: {":user": insertedComment.user},
                          relatedUsers: [insertedComment.user],
                          publication: insertedComment.publication,
                          timestamps: {created: new Date().toISOString(), modified: null},
                          seen: false
                        };
                        return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)])
                          .then(()=>{
                            return languageInterface.getCaption(parentComment.user.language,["responseReceived"])
                              .then((caption)=>{
                                return languageInterface.getCaption(parentComment.user.language,["summaryTextNotification"])
                                  .then((summaryCaption)=>{
                                    let title = caption.replace(':user', commenter.username);
                                    let notification = {title: title, body: '', summaryText: summaryCaption};
                                    let data = {type: 'comment', category: publication._id, key: insertedComment._id};
                                    return NotificationService.send({notification: notification, data: data},[parentComment.user.notificationKey])
                                      .then(()=>{
                                        return Promise.resolve(insertedComment)
                                      });
                                  });
                              });
                          });
                      }
                      else{
                        let newOutActivity = {
                          user: insertedComment.user,
                          direction: "OUT",
                          caption: "responseGivenInForeignCommentInForeignPublication",
                          params: {":user": parentComment.user._id},
                          relatedUsers: [parentComment.user._id],
                          publication: insertedComment.publication,
                          timestamps: {created: new Date().toISOString(), modified: null},
                          seen: true
                        };
                        let newCommenterInActivity = {
                          user: parentComment.user._id,
                          direction: "IN",
                          caption: "responseReceived",
                          params: {":user": insertedComment.user},
                          relatedUsers: [insertedComment.user],
                          publication: insertedComment.publication,
                          timestamps: {created: new Date().toISOString(), modified: null},
                          seen: false
                        };
                        let newPublisherInActivity = {
                          user: publication.user._id,
                          direction: "IN",
                          caption: "responseReceivedInMyPublication",
                          params: {":user": insertedComment.user},
                          relatedUsers: [insertedComment.user],
                          publication: insertedComment.publication,
                          timestamps: {created: new Date().toISOString(), modified: null},
                          seen: false
                        };
                        let activitiesToInsert = [activityInterface.insert(newOutActivity),activityInterface.insert(newCommenterInActivity)];
                        if(!parentComment.user._id.equals(publication.user._id)){
                          activitiesToInsert.push(activityInterface.insert(newPublisherInActivity));
                        }
                        return Promise.all(activitiesToInsert)
                          .then(()=>{
                            return languageInterface.getCaption(parentComment.user.language,["responseReceived"])
                              .then((caption)=>{
                                return languageInterface.getCaption(parentComment.user.language,["summaryTextNotification"])
                                  .then((summaryCaption)=>{
                                    let title = caption.replace(':user', commenter.username);
                                    let notification = {title: title, body: '', summaryText: summaryCaption};
                                    let data = {type: 'comment', category: publication._id, key: insertedComment._id};
                                    return NotificationService.send({notification: notification, data: data},[parentComment.user.notificationKey])
                                      .then(()=>{
                                        if(!parentComment.user._id.equals(publication.user._id)){
                                          return languageInterface.getCaption(publication.user.language,["responseReceivedInMyPublication"])
                                            .then((caption)=>{
                                              return languageInterface.getCaption(publication.user.language,["summaryTextNotification"])
                                                .then((summaryCaption)=>{
                                                  let title = caption.replace(':user', commenter.username);
                                                  let notification = {title: title, body: '', summaryText: summaryCaption};
                                                  let data = {type: 'comment', category: publication._id, key: insertedComment._id};
                                                  return NotificationService.send({notification: notification, data: data},[publication.user.notificationKey])
                                                    .then(()=>{
                                                      return Promise.resolve(insertedComment)
                                                    });
                                                });
                                            });
                                        }
                                        else{
                                          return Promise.resolve(insertedComment)
                                        }
                                      });
                                  });
                              });
                          });
                      }
                    }
                  })
              }
              else{
                if(publication.user._id.equals(insertedComment.user)){
                  let newOutActivity = {
                    user: insertedComment.user,
                    direction: "OUT",
                    caption: "commentGivenInOwnPublication",
                    params: {},
                    relatedUsers: [],
                    publication: insertedComment.publication,
                    timestamps: {created: new Date().toISOString(), modified: null},
                    seen: true
                  };
                  return activityInterface.insert(newOutActivity)
                    .then(()=>{
                      return Promise.resolve(insertedComment);
                    });
                }
                else{
                  let newOutActivity = {
                    user: insertedComment.user,
                    direction: "OUT",
                    caption: "commentGivenInForeignPublication",
                    params: {":user": publication.user._id},
                    relatedUsers: [publication.user._id],
                    publication: insertedComment.publication,
                    timestamps: {created: new Date().toISOString(), modified: null},
                    seen: true
                  };
                  let newPublisherInActivity = {
                    user: publication.user._id,
                    direction: "IN",
                    caption: "commentReceived",
                    params: {":user": insertedComment.user},
                    relatedUsers: [insertedComment.user],
                    publication: insertedComment.publication,
                    timestamps: {created: new Date().toISOString(), modified: null},
                    seen: false
                  };
                  return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newPublisherInActivity)])
                    .then(()=>{
                      return languageInterface.getCaption(publication.user.language,["commentReceived"])
                        .then((caption)=>{
                          return languageInterface.getCaption(publication.user.language,["summaryTextNotification"])
                            .then((summaryCaption)=>{
                              let title = caption.replace(':user', commenter.username);
                              let notification = {title: title, body: '', summaryText: summaryCaption};
                              let data = {type: 'comment', category: publication._id, key: insertedComment._id};
                              return NotificationService.send({notification: notification, data: data},[publication.user.notificationKey])
                                .then(()=>{
                                  return Promise.resolve(insertedComment)
                                });
                            });
                        });
                    });
                }
              }
            })
        });
    });
};

db.updateComment = (comment)=>{
  return commentInterface.update(comment)
    .then((updatedComment)=>{
      return userInterface.getOne(updatedComment.user)
        .then((commenter)=>{
          return publicationInterface.getOne(updatedComment.publication)
            .then((publication)=> {
              if(updatedComment.parent != null) {
                return commentInterface.getOne(updatedComment.parent)
                  .then((parentComment)=>{
                    if(parentComment.user._id.equals(updatedComment.user)){
                      if(publication.user._id.equals(updatedComment.user)){
                        let newOutActivity = {
                          user: updatedComment.user,
                          direction: "OUT",
                          caption: "responseUpdatedInOwnCommentInOwnPublication",
                          params: {},
                          relatedUsers: [],
                          publication: updatedComment.publication,
                          timestamps: {created: new Date().toISOString(), modified: null},
                          seen: true
                        };
                        return activityInterface.insert(newOutActivity)
                          .then(()=>{
                            return Promise.resolve(updatedComment);
                          });
                      }
                      else{
                        let newOutActivity = {
                          user: updatedComment.user,
                          direction: "OUT",
                          caption: "responseUpdatedInOwnCommentInForeignPublication",
                          params: {":user": publication.user._id},
                          relatedUsers: [publication.user._id],
                          publication: updatedComment.publication,
                          timestamps: {created: new Date().toISOString(), modified: null},
                          seen: true
                        };
                        let newInActivity = {
                          user: publication.user._id,
                          direction: "IN",
                          caption: "responseUpdatedReceivedInMyPublication",
                          params: {":user": updatedComment.user},
                          relatedUsers: [updatedComment.user],
                          publication: updatedComment.publication,
                          timestamps: {created: new Date().toISOString(), modified: null},
                          seen: false
                        };
                        return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)])
                          .then(()=>{
                            return languageInterface.getCaption(publication.user.language,["responseUpdatedReceivedInMyPublication"])
                              .then((caption)=>{
                                return languageInterface.getCaption(publication.user.language,["summaryTextNotification"])
                                  .then((summaryCaption)=>{
                                    let title = caption.replace(':user', commenter.username);
                                    let notification = {title: title, body: '', summaryText: summaryCaption};
                                    let data = {type: 'comment', category: publication._id, key: updatedComment._id};
                                    return NotificationService.send({notification: notification, data: data},[publication.user.notificationKey])
                                      .then(()=>{
                                        return Promise.resolve(updatedComment)
                                      });
                                  });
                              });
                          });
                      }
                    }
                    else {
                      if(publication.user._id.equals(updatedComment.user)){
                        let newOutActivity = {
                          user: updatedComment.user,
                          direction: "OUT",
                          caption: "responseUpdatedInForeignCommentInOwnPublication",
                          params: {":user": parentComment.user._id},
                          relatedUsers: [parentComment.user._id],
                          publication: updatedComment.publication,
                          timestamps: {created: new Date().toISOString(), modified: null},
                          seen: true
                        };
                        let newInActivity = {
                          user: parentComment.user._id,
                          direction: "IN",
                          caption: "responseUpdatedReceived",
                          params: {":user": updatedComment.user},
                          relatedUsers: [updatedComment.user],
                          publication: updatedComment.publication,
                          timestamps: {created: new Date().toISOString(), modified: null},
                          seen: false
                        };
                        return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newInActivity)])
                          .then(()=>{
                            return languageInterface.getCaption(parentComment.user.language,["responseUpdatedReceived"])
                              .then((caption)=>{
                                return languageInterface.getCaption(parentComment.user.language,["summaryTextNotification"])
                                  .then((summaryCaption)=>{
                                    let title = caption.replace(':user', commenter.username);
                                    let notification = {title: title, body: '', summaryText: summaryCaption};
                                    let data = {type: 'comment', category: publication._id, key: updatedComment._id};
                                    return NotificationService.send({notification: notification, data: data},[parentComment.user.notificationKey])
                                      .then(()=>{
                                        return Promise.resolve(updatedComment)
                                      });
                                  });
                              });
                          });
                      }
                      else{
                        let newOutActivity = {
                          user: updatedComment.user,
                          direction: "OUT",
                          caption: "responseUpdatedInForeignCommentInForeignPublication",
                          params: {":user": parentComment.user._id},
                          relatedUsers: [parentComment.user._id],
                          publication: updatedComment.publication,
                          timestamps: {created: new Date().toISOString(), modified: null},
                          seen: true
                        };
                        let newCommenterInActivity = {
                          user: parentComment.user._id,
                          direction: "IN",
                          caption: "responseUpdatedReceived",
                          params: {":user": updatedComment.user},
                          relatedUsers: [updatedComment.user],
                          publication: updatedComment.publication,
                          timestamps: {created: new Date().toISOString(), modified: null},
                          seen: false
                        };
                        let newPublisherInActivity = {
                          user: publication.user._id,
                          direction: "IN",
                          caption: "responseUpdatedReceivedInMyPublication",
                          params: {":user": updatedComment.user},
                          relatedUsers: [updatedComment.user],
                          publication: updatedComment.publication,
                          timestamps: {created: new Date().toISOString(), modified: null},
                          seen: false
                        };
                        let activitiesToInsert = [activityInterface.insert(newOutActivity),activityInterface.insert(newCommenterInActivity)];
                        if(!parentComment.user._id.equals(publication.user._id)){
                          activitiesToInsert.push(activityInterface.insert(newPublisherInActivity));
                        }
                        return Promise.all(activitiesToInsert)
                          .then(()=>{
                            return languageInterface.getCaption(parentComment.user.language,["responseUpdatedReceived"])
                              .then((caption)=>{
                                return languageInterface.getCaption(parentComment.user.language,["summaryTextNotification"])
                                  .then((summaryCaption)=>{
                                    let title = caption.replace(':user', commenter.username);
                                    let notification = {title: title, body: '', summaryText: summaryCaption};
                                    let data = {type: 'comment', category: publication._id, key: updatedComment._id};
                                    return NotificationService.send({notification: notification, data: data},[parentComment.user.notificationKey])
                                      .then(()=>{
                                        if(!parentComment.user._id.equals(publication.user._id)){
                                          return languageInterface.getCaption(publication.user.language,["responseUpdatedReceivedInMyPublication"])
                                            .then((caption)=>{
                                              return languageInterface.getCaption(publication.user.language,["summaryTextNotification"])
                                                .then((summaryCaption)=>{
                                                  let title = caption.replace(':user', commenter.username);
                                                  let notification = {title: title, body: '', summaryText: summaryCaption};
                                                  let data = {type: 'comment', category: publication._id, key: updatedComment._id};
                                                  return NotificationService.send({notification: notification, data: data},[publication.user.notificationKey])
                                                    .then(()=>{
                                                      return Promise.resolve(updatedComment)
                                                    });
                                                });
                                            });
                                        }
                                        else{
                                          return Promise.resolve(updatedComment)
                                        }
                                      });
                                  });
                              });
                          });
                      }
                    }
                  })
              }
              else{
                if(publication.user._id.equals(updatedComment.user)){
                  let newOutActivity = {
                    user: updatedComment.user,
                    direction: "OUT",
                    caption: "commentUpdatedInOwnPublication",
                    params: {},
                    relatedUsers: [],
                    publication: updatedComment.publication,
                    timestamps: {created: new Date().toISOString(), modified: null},
                    seen: true
                  };
                  return activityInterface.insert(newOutActivity)
                    .then(()=>{
                      return Promise.resolve(updatedComment);
                    });
                }
                else{
                  let newOutActivity = {
                    user: updatedComment.user,
                    direction: "OUT",
                    caption: "commentUpdatedInForeignPublication",
                    params: {":user": publication.user._id},
                    relatedUsers: [publication.user._id],
                    publication: updatedComment.publication,
                    timestamps: {created: new Date().toISOString(), modified: null},
                    seen: true
                  };
                  let newPublisherInActivity = {
                    user: publication.user._id,
                    direction: "IN",
                    caption: "commentUpdatedReceived",
                    params: {":user": updatedComment.user},
                    relatedUsers: [updatedComment.user],
                    publication: updatedComment.publication,
                    timestamps: {created: new Date().toISOString(), modified: null},
                    seen: false
                  };
                  return Promise.all([activityInterface.insert(newOutActivity),activityInterface.insert(newPublisherInActivity)])
                    .then(()=>{
                      return languageInterface.getCaption(publication.user.language,["commentUpdatedReceived"])
                        .then((caption)=>{
                          return languageInterface.getCaption(publication.user.language,["summaryTextNotification"])
                            .then((summaryCaption)=>{
                              let title = caption.replace(':user', commenter.username);
                              let notification = {title: title, body: '', summaryText: summaryCaption};
                              let data = {type: 'comment', category: publication._id, key: updatedComment._id};
                              return NotificationService.send({notification: notification, data: data},[publication.user.notificationKey])
                                .then(()=>{
                                  return Promise.resolve(updatedComment)
                                });
                            });
                        });
                    });
                }
              }
            })
        });
    });
};

db.deleteComment = (user,id)=>{
  return commentInterface.getOne(id)
    .then((deletedComment)=>{
      return commentInterface.deleteOne(id)
        .then(()=>{
          let newOutActivity = null;
          if(deletedComment.user._id.equals(user)){
            if(deletedComment.parent != null){
              newOutActivity = {
                user: deletedComment.user._id,
                direction: "OUT",
                caption: "ownResponseDeleted",
                params: {},
                relatedUsers: [],
                publication: deletedComment.publication,
                timestamps: {created: new Date().toISOString(), modified: null},
                seen: true
              };
            }
            else{
              newOutActivity = {
                user: deletedComment.user._id,
                direction: "OUT",
                caption: "ownCommentDeleted",
                params: {},
                relatedUsers: [],
                publication: deletedComment.publication,
                timestamps: {created: new Date().toISOString(), modified: null},
                seen: true
              };
            }
          }
          else{
            if(deletedComment.parent != null){
              newOutActivity = {
                user: deletedComment.user._id,
                direction: "OUT",
                caption: "foreignResponseDeleted",
                params: {":user": deletedComment.user._id},
                relatedUsers: [deletedComment.user._id],
                publication: deletedComment.publication,
                timestamps: {created: new Date().toISOString(), modified: null},
                seen: true
              };
            }
            else{
              newOutActivity = {
                user: user,
                direction: "OUT",
                caption: "foreignCommentDeleted",
                params: {":user": deletedComment.user._id},
                relatedUsers: [deletedComment.user._id],
                publication: deletedComment.publication,
                timestamps: {created: new Date().toISOString(), modified: null},
                seen: true
              };
            }
          }
          return activityInterface.insert(newOutActivity)
            .then(()=>{
              return Promise.resolve(deletedComment);
            })
        });
    })
};

db.getExperience = (id)=>{
  return experienceInterface.getOne(id);
};

db.getExperienceCategories = ()=>{
  return experienceInterface.getCategories();
};

db.getExperienceTypes = ()=>{
  return experienceInterface.getTypes();
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

db.getFavorites = (id,count)=>{
  return userInterface.getFavorites(id,count);
};

db.createUser = (user)=>{
  return userInterface.insert(user);
};

db.updateUser = (user)=>{
  return userInterface.update(user);
};

db.patchUser = (id,user)=>{
  if(user.avatar){
    return userInterface.getOne(id,{bucketId: 1, avatar: 1})
      .then((userToUpdate)=>{
        return ImageUploader.removeFromGcs(userToUpdate.bucketId,userToUpdate.avatar)
          .then(()=>{
            return userInterface.patch(id,user);
          })
          .catch(()=>{
            return userInterface.patch(id,user);
          });
      });
  }
  return userInterface.patch(id,user);
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

db.patchInbox = (id,fields)=>{
  return inboxInterface.patch(id,fields)
    .then((updatedInbox)=>{
      console.log("updatedInbox: " + JSON.stringify(updatedInbox));
      if(updatedInbox.avatar != fields.avatar && fields.avatar){
        return userInterface.getOne(updatedInbox.creator)
          .then((creator)=>{
            return ImageUploader.removeFromGcs(creator.bucketId,updatedInbox.avatar)
              .then(()=>{
                return Promise.resolve(updatedInbox);
              })
              .catch(()=>{
                return Promise.resolve(updatedInbox);
              })
          });
      }
      else{
        return Promise.resolve(updatedInbox);
      }
    });
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

db.getPlaces = (params)=>{
  return placeInterface.getN(params);
};

db.getPlace = (id)=>{
  return placeInterface.getOne(id);
};

db.createPlace = (place)=>{
  return placeInterface.insert(place);
};

db.updatePlace = (place)=>{
  return placeInterface.update(place);
};

db.getComplaints = ()=>{
  return complaintInterface.getAll();
};

db.getComplaint = (id)=>{
  return complaintInterface.getOne(id);
};

db.createComplaint = (complaint)=>{
  complaint.timestamps = {created: new Date().toISOString(), modified: null};
  complaint.checked = false;
  return complaintInterface.getAll({reporter: complaint.reporter, reported: complaint.reported, publication: complaint.publication})
    .then((complaints)=>{
      if(complaints.length>0){
        return Promise.resolve(null);
      }
      return complaintInterface.insert(complaint);
    })
};

module.exports = db;
