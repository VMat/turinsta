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
      for(let i=0; i<captionKeys.length; ++i){
        caption = caption[captionKeys[i]];
      }
      return Promise.resolve(caption);
    })
};

module.exports = LanguageInterface;
