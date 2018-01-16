const Activities = require('../models/activity');
const Publications = require('../models/publication');
const Users = require('../models/user');
const Commons = require('./commons');

let ActivityInterface = {};

ActivityInterface.getAll = ()=>{
  return Commons.getAll(Activities)
    .populate('user')
    .populate('relatedUsers')
    .populate('AppState');
};

ActivityInterface.getOne = (id)=>{
  return Commons.getOne(Activities, id)
    .populate('user')
    .populate('relatedUsers')
    .populate('AppState');
};

ActivityInterface.insert = (activity)=>{
  return Commons.insert(new Activities(activity));
};

ActivityInterface.update = (activity)=>{
  return Commons.update(Activities,activity);
};

ActivityInterface.deleteOne = (activity)=>{
  return Commons.removeOne(Activities, activity);
};

module.exports = ActivityInterface;
