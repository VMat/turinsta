const Languages = require('../models/language');
const Commons = require('./commons');

let LanguageInterface = {};

LanguageInterface.getLanguages = ()=>{
  return Commons.getAll(Languages);
};

LanguageInterface.getLanguage = (id)=>{
  return Commons.getOne(Languages, id)
};

module.exports = LanguageInterface;
