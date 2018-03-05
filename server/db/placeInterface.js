const Publications = require('../models/publication');
const Places = require('../models/place');
const Commons = require('./commons');

let PlaceInterface = {};

PlaceInterface.getAll = ()=>{
  return Commons.getAll(Places);
};

PlaceInterface.getOne = (id)=>{
  return Commons.getOne(Places, id);
};

PlaceInterface.insert = (place)=>{
  return Commons.insert(new Places(place));
};

module.exports = PlaceInterface;
