const Activities = require('../models/activity');
const Publications = require('../models/publication');
const Experiences = require('../models/experience');
const ExperienceCategories = require('../models/experienceCategory');
const ExperienceTypes = require('../models/experienceType');
const Comments = require('../models/comment');
const Users = require('../models/user');
const Commons = require('./commons');
const UserInterface = require('./userInterface');

let ActivityInterface = {};

ActivityInterface.getN = (userId,rowFilters,limit)=>{
  let filters = Commons.processParams(rowFilters);
  return Commons.getN(Activities,{...filters, user: userId},limit,{"timestamps.created": -1})
    .populate('user')
    .populate('publication')
    .populate({
      path: 'publication',
      populate: {
        path: 'experienceIds'
      }
    })
    .populate({
      path: 'experienceIds',
      populate: {
        path: 'category'
      }
    })
    .populate({
      path: 'experienceIds',
      populate: {
        path: 'type'
      }
    })
    .populate({
      path: 'publication',
      populate: {
        path: 'commentIds'
      }
    })
    .populate('relatedUsers');
};

ActivityInterface.getOne = (id)=>{
  return Commons.getOne(Activities, id)
    .populate('user')
    .populate('relatedUsers')
    .populate('publication')
    .populate({
      path: 'publication',
      populate: {
        path: 'commentIds'
      }
    })
    .populate({
      path: 'publication',
      populate: {
        path: 'experienceIds'
      }
    }).exec((err,data)=>{
      console.log("EXPERIENCE: " + JSON.stringify(data.publication.experienceIds[0]));
      return Experiences.populate(data.publication.experienceIds[0],{path: 'category'})
    });
    // .populate({
    //   path: 'publication.experienceIds',
    //   populate: {
    //     path: 'category',
    //     model: 'ExperienceCategories'
    //   }
    // })
    // .populate({
    //   path: 'publication.experienceIds',
    //   populate: {
    //     path: 'type',
    //     model: 'ExperienceTypes'
    //   }
    // });
};

ActivityInterface.insert = (activity)=>{
  if(activity.direction=='IN'){
    return Commons.insert(new Activities(activity))
    .then((newActivity)=>{
      return UserInterface.addActivity(newActivity.user,newActivity._id);
    });
  }
  else{
    return Commons.insert(new Activities(activity));
  }
};

ActivityInterface.update = (activity)=>{
  activity.seen = true;
  return Commons.update(Activities,activity)
    .then((updatedActivity)=>{
      return UserInterface.removeActivity(updatedActivity.user,updatedActivity._id);
    });
};

ActivityInterface.deleteOne = (id)=>{
  return Commons.getOne(Activities,id)
    .then((activity)=>{
      let user = activity.direction=='IN'? activity.user : activity.relatedUsers[0];
        UserInterface.removeActivity(user,activity._id)
          .then(()=>{
            return Commons.removeOne(Activities, activity);
          });
    });
};

module.exports = ActivityInterface;
