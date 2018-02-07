const Languages = require('../models/language');
const Commons = require('./commons');

let LanguageInterface = {};

LanguageInterface.getAll = ()=>{
  return Commons.getAll(Languages);
};

LanguageInterface.getOne = (id)=>{
  return Commons.getOne(Languages, id)
};

LanguageInterface.getCaption = (id,captionKeys)=>{
  return Commons.getOne(Languages,id)
    .then((language)=>{
      let caption = language.glosary;
      for(let key in captionKeys){
        caption = caption[key];       
      }
      return Promise.resolve(caption);
    })
};

module.exports = LanguageInterface;
