const Publications = require('../models/publication');
const Users = require('../models/user');
const Experiences = require('../models/experience');
const Comments = require('../models/comment');
const Commons = require('./commons');
// const aggregate = require('mongoose/lib/aggregate');
const mongoose = require('mongoose');

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
      let match = Publications.aggregate([{ $match: {_id: mongoose.Types.ObjectId('59f8d0eb9e46160012027790')}},
        {
          $lookup: [
            {
              from: "Users",
              localField: "user",
              foreignField: "_id",
              as: "userData"
            },
            {
              from: "Experiences",
              localField: "experiences",
              foreignField: "_id",
              as: "experiencesData"
            }
          ]
        }
      ]);
      return match.exec();
    },
      /*Publications.find(filters)*/
//          .populate('user')

            /*{
              $lookup:
                {
                  from: "Users",
                  localField: "user",
                  foreignField: "_id",
                  as: "userData"
                }
            }*/

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

