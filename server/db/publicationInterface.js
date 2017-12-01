const Publications = require('../models/publication');
const Users = require('../models/user');
const Experiences = require('../models/experience');
const Comments = require('../models/comment');
const Commons = require('./commons');

const PublicationInterface = (function(){

  function oPublicationInterface(){}

  oPublicationInterface.prototype = {

    getAll: ()=>{
      return Commons.getAll(Publications)
        .populate('user')
        .populate('experiences')
        .populate('comments');
    },

    getN: (searchParams,n,order)=>{      
      let filters = Commons.processParams(searchParams);
      
      return /*Publications.find(filters)*/
//          .populate('user')
          Publications.aggregate([
            /*{
              $lookup:
                {
                  from: "Users",
                  localField: "user",
                  foreignField: "_id",
                  as: "userData"
                }
            }*/
          ]).exec();
          //.populate('experiences')
          //.populate('comments');
//          .sort(order)
//          .limit(Number(n));
      
      /*db.orders.aggregate([
        {
          $lookup:
            {
              from: "inventory",
              localField: "item",
              foreignField: "sku",
              as: "inventory_docs"
          }
        }
      ])*/
      
      //return Commons.getN(Publications,filters,n,order)
      //  .populate('user')
      //  .populate('experiences')
      //  .populate('comments');
    },

    getOne: (id)=>{
      return Commons.getOne(Publications, id)
        .populate('user')
        .populate('experiences')
        .populate('comments');
    },

    insert: (publication)=>{
      return Commons.insert(new Publications(publication));
    },

    update: (publication)=>{
      return Commons.update(Publications,publication);
    },

    deleteOne: (publication)=>{
      return Commons.removeOne(Publications,publication);
    }

  };

  return oPublicationInterface;

})();

const oPublicationInterface = new PublicationInterface();

module.exports = oPublicationInterface;

