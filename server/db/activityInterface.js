const Activities = require('../models/activity');
const Publications = require('../models/publication');
const Users = require('../models/user');
const Captions = require('../models/caption');
const Commons = require('./commons');

var ActivityInterface = (function(){

  function oActivityInterface(){}

  oActivityInterface.prototype = {

    getAll: ()=>{
      return Commons.getAll(Activities)
        .populate('user')
        .populate('caption')
        .populate('relatedUsers')
        .populate('AppState');
    },

    getOne: (id)=>{
      return Commons.getOne(Activities, id)
        .populate('user')
        .populate('caption')
        .populate('relatedUsers')
        .populate('AppState');
    },

    insert: (activity)=>{
      return Commons.insert(new Activities(activity));
    },

    update: (activity)=>{
      return Commons.update(Activities,activity);
    },

    deleteOne: (id)=>{
      return Commons.removeOne(Activities, id);
    }
  }

  return oActivityInterface;

})();

oActivityInterface = new ActivityInterface();

module.exports = oActivityInterface;
