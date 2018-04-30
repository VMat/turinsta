const Publications = require('../models/publication');
const Places = require('../models/place');
const Users = require('../models/user');
const Commons = require('./commons');

let PlaceInterface = {};

PlaceInterface.getN = (params)=>{
  let filters = Commons.processAggregateParams(params);
  return Places.aggregate([
    {
      $lookup: {
        from: "Publications",
        localField: "publications",
        foreignField: "_id",
        as: "publicationData"
      }
    },
    {
      $unwind: {
        path: "$publicationData",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: "$_id",
        place: { $first : "$$ROOT"},
        publications: {
          $addToSet: "$publicationData"
        }
        // user: {
        //   $first: "$userData"
        // },
      }
    },
    ...filters
  ]).exec();
};

PlaceInterface.getOne = (id)=>{
  return Commons.getOne(Places, id);
};

PlaceInterface.insert = (publication)=>{
  return Commons.getN(Places,{place_id: publication.places[0].place_id},1)
    .then((places)=>{
      if(places.length>0){
        places[0].publications.push(publication._id);
        return Commons.update(Places, places[0]);
      }
      return Commons.insert(new Places({... publication.places[0], publications: [publication._id]}))
    })
};

PlaceInterface.delete = (oldPublication)=> {
  return Commons.getN(Places, {googlePlacesId: oldPublication.places[0].place_id}, 1)
    .then((places) => {
      if(places.length > 0){
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
