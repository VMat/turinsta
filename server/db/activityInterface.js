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
        .populate('publication');
    },

    getOne: (id)=>{
      return Commons.getOne(Activities, id)        
        .populate('user')
        .populate('caption')
        .populate('relatedUsers')
        .populate('publication');
    }
  }

  return oActivityInterface;

})();

oActivityInterface = new ActivityInterface();

module.exports = oActivityInterface;
