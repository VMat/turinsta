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

PlaceInterface.insert = (publication)=>{
  return Commons.getN(Places,{googlePlacesId: publication.places[0].place_id},1)
    .then((places)=>{
      if(places.length>0){
        places[0].publications.push(publication._id);
        return Commons.update(Places, places[0]);
      }
      return Commons.insert(new Places({name: publication.places[0].name, googlePlacesId: publication.places[0].place_id, publications: [publication._id]}))
    })
};

PlaceInterface.update = (oldPublication)=> {
  return Commons.getN(Places, {googlePlacesId: oldPublication.places[0].place_id}, 1)
    .then((places) => {
      if (places.length > 0) {
        let index = null;
        places[0].publications.forEach((publicationToCompare,i)=>{
          if(publicationToCompare._id==oldPublication._id){
            index = i;
          }
        });
        places[0].publications.splice(index,1);
        return Commons.update(Places, places[0]);
      }
      return Promise.resolve(null);
    });
};

module.exports = PlaceInterface;
