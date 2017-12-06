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
      let filters = Commons.processAggregateParams(searchParams);
      return Publications.aggregate([
        {
          $lookup: {
            from: "Users",
            localField: "user",
            foreignField: "_id",
            as: "userData"
          }
        },
        {
          $unwind: "$userData",
        },
        {
          $unwind: {
            path: "$experienceIds",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "Experiences",
            localField: "experienceIds",
            foreignField: "_id",
            as: "experiences"
          }
        },
        {
          $unwind: {
            path: "$experiences",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $unwind: {
            path: "$commentIds",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "Comments",
            localField: "commentIds",
            foreignField: "_id",
            as: "comments"
          }
        },
        {
          $unwind: {
            path: "$comments",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $group: {
            _id: "$_id",
            publication: { $first : "$$ROOT"},
            user: {
              $first: "$userData"
            },
            experiences: {
              $addToSet: "$experiences"
            },
            comments: {
              $addToSet: "$comments"
            }
          }
        },
        ...filters,
        {$sort: order},
        {$limit: Number(n)}
      ]).exec();
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
    },
    
    addPublicationAssessment: (assessment)=>{
      return Commons.getOne(Publications, assessment.publication)
        .then((publication)=> {
          publication.assessments.push({user: assessment.user, value: assessment.value});
          publication.score = (publication.score*(publication.assessments.length-1) + assessment.value)/publication.assessments.length;
          return Commons.update(Publications,publication);
        });
    }

  };

  return oPublicationInterface;

})();

const oPublicationInterface = new PublicationInterface();

module.exports = oPublicationInterface;

