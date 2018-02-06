const Activities = require('../models/activity');
const Publications = require('../models/publication');
const Users = require('../models/user');
const Commons = require('./commons');
const UserInterface = require('./userInterface');

let ActivityInterface = {};

ActivityInterface.getN = (userId,filters,limit)=>{
  return Commons.getN(Activities,{...filters, user: userId},limit,{"timestamps.created": -1})
    .populate('user')
    .populate('publication')
    .populate('relatedUsers');
};

ActivityInterface.getOne = (id)=>{
  return Commons.getOne(Activities, id)
    .populate('user')
    .populate('relatedUsers')
    .populate('AppState');
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
