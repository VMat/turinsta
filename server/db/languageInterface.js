const Languages = require('../models/language');
const Commons = require('./commons');

let LanguageInterface = {};

LanguageInterface.getAll = ()=>{
  return Commons.getAll(Languages);
};

LanguageInterface.getOne = (id)=>{
  return Commons.getOne(Languages, id)
};

module.exports = LanguageInterface;
