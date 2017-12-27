const Publications = require('../models/publication');
const Users = require('../models/user');
const Experiences = require('../models/experience');
const Comments = require('../models/comment');
const Commons = require('./commons');
const ExperienceInterface = require('./experienceInterface');
const CommentInterface = require('./commentInterface');

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

    patch: (id,fields)=>{
      return Commons.patch(Publications,id,fields)
    },
    
    update: (publication)=>{
      return Commons.update(Publications,publication);
    },

    deleteOne: (id)=>{
      return Commons.getOne(Publications,id)
        .then((publication)=>{
          publication.experienceIds.forEach((experience)=>{
            ExperienceInterface.deleteOne(experience);
          });
          publication.commentIds.forEach((comment)=>{
            CommentInterface.deleteOne(comment);
          });
          return publication;
        })
        .then((publication)=>{
          return Commons.removeOne(Publications,publication);
        });
    },
    
    addPublicationAssessment: (assessment)=>{
      return Commons.getOne(Publications, assessment.publication)
        .then((publication)=> {
          publication.assessments.push({user: assessment.user, value: assessment.value});
          publication.score = (publication.score*(publication.assessments.length-1) + assessment.value)/publication.assessments.length;
          return Commons.update(Publications,publication);
        });
    },
    
    modifyPublicationAssessment: (assessment)=>{
      return Commons.getOne(Publications, assessment.publication)
        .then((publication)=> {
          let oldValue = null;
          publication.assessments.map((assessmentItem)=>{
            if(assessmentItem.user == assessment.user){
              oldValue = assessmentItem.value;
              assessmentItem.value = assessment.value
            }
          });
          publication.score = (publication.score*publication.assessments.length - oldValue + assessment.value)/publication.assessments.length;
          return Commons.update(Publications,publication);
        });
    },
    
    deletePublicationAssessment: (assessment)=>{
      return Commons.getOne(Publications, assessment.publication)
        .then((publication)=> {
          publication.assessments.map((assessmentItem,i)=>{
            if(assessmentItem.user == assessment.user){
              publication.assessments.splice(i,1);
            }
          });
          publication.score = publication.assessments.length > 0 ? (publication.score*(publication.assessments.length+1) - assessment.value)/publication.assessments.length : 0;
          return Commons.update(Publications,publication);
        });
    },
    
    addPublicationFollower: (publication, user)=>{
      return Commons.getOne(Publications, publication)
        .then((publication)=>{
          publication.followers.push(user);
          return Commons.update(Publications,publication);
        });
    },
    
    removePublicationFollower: (publication, user)=>{
      return Commons.getOne(Publications, publication)
        .then((publication)=>{
          publication.followers.splice(publication.followers.indexOf(user),1);
          return Commons.update(Publications,publication);
        });
    }

  };

  return oPublicationInterface;

})();

const oPublicationInterface = new PublicationInterface();

module.exports = oPublicationInterface;

