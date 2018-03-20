const Publications = require('../models/publication');
const Users = require('../models/user');
const ExperienceCategory = require('../models/experienceCategory');
const ExperienceType = require('../models/experienceType');
const Experiences = require('../models/experience');
const Comments = require('../models/comment');
const Places = require('../models/place');
const Commons = require('./commons');

let PublicationInterface = {};

PublicationInterface.getAll = ()=>{
  return Commons.getAll(Publications)
    .populate('user')
    .populate('experienceIds')
    .populate('commentIds');
};

PublicationInterface.getN = (searchParams,n,order)=>{
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
      $lookup: {
        from: "ExperienceCategories",
        localField: "experiences.category",
        foreignField: "_id",
        as: "experiences.category"
      }
    },
    {
      $unwind: {
        path: "$experiences.category",
        preserveNullAndEmptyArrays: false
      }
    },
    {
      $lookup: {
        from: "ExperienceTypes",
        localField: "experiences.type",
        foreignField: "_id",
        as: "experiences.type"
      }
    },
    {
      $unwind: {
        path: "$experiences.type",
        preserveNullAndEmptyArrays: false
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
      $unwind: {
        path: "$comments.replies",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "Users",
        localField: "comments.replies.user",
        foreignField: "_id",
        as: "comments.replies.user"
      }
    },
    {
      $unwind: {
        path: "$comments.replies.user",
        preserveNullAndEmptyArrays: false
      }
    },
    {
      $lookup: {
        from: "Users",
        localField: "comments.user",
        foreignField: "_id",
        as: "comments.user"
      }
    },
    {
      $unwind: {
        path: "$comments.user",
        preserveNullAndEmptyArrays: false
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
  // .exec().then((publications)=>{
  //   publications.forEach((publication)=>{
  //     if(publication.experiences.length == 1){
  //       if(!publication.experiences[0]._id){
  //         publication.experiences = [];
  //       }
  //     }
  //   });
  //   return Promise.resolve(publications);
  // });
};

PublicationInterface.getOne = (id)=>{
  return Commons.getOne(Publications, id)
    .populate('user')
    .populate('experienceIds')
    .populate('commentIds');
};

PublicationInterface.insert = (publication)=>{
  publication.timestamps = {
    created: new Date().toISOString(),
    modified: null
  };
  publication.score = 0;
  return Commons.insert(new Publications(publication));
};

PublicationInterface.patch = (id,fields)=>{
  return Commons.getOne(Publications,id)
    .then((publication)=>{
      fields.timestamps = {
        created: publication.timestamps.created,
        modified: new Date().toISOString()
      };
      return Commons.patch(Publications,id,fields)
    });
};

PublicationInterface.update = (publication)=>{
  return Commons.update(Publications,publication);
};

PublicationInterface.deleteOne = (id)=>{
  const imageUploader = require('../services/imageUploader');
  const ExperienceInterface = require('./experienceInterface');
  const CommentInterface = require('./commentInterface');

  return Commons.getOne(Publications,id)
    .then((publication)=>{
      return ExperienceInterface.deleteFromPublication(id)
      .then(()=>{
        return CommentInterface.deleteFromPublication(id)
        .then(()=>{
          return Commons.getOne(Users, publication.user)
            .then((user)=>{
              return Promise.all(
                publication.images.map((image)=>{
                  return imageUploader.removeFromGcs(user.bucketId,image.url)
                })
              )
              .then(()=>{
                let index = null;
                user.publications.forEach((publication,i)=>{
                  if(publication._id == publication._id){
                    index = i;
                  }
                });
                user.publications.splice(index,1);
                return Commons.update(Users, user)
                  .then(()=>{
                    return Commons.removeOne(Publications,publication);
                  })
              })
            })
        })
      })
    });
};

PublicationInterface.addPublicationAssessment = (assessment)=>{
  return Commons.getOne(Publications, assessment.publication)
    .then((publication)=> {
      publication.assessments.push({user: assessment.user, value: assessment.value});
      publication.score = (publication.score*(publication.assessments.length-1) + assessment.value)/publication.assessments.length;
      return Commons.update(Publications,publication);
    });
};

PublicationInterface.modifyPublicationAssessment = (assessment)=>{
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
};

PublicationInterface.deletePublicationAssessment = (assessment)=>{
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
};

PublicationInterface.addPublicationFollower = (publicationId, userId)=>{
  return Commons.getOne(Publications, publicationId)
    .then((publication)=>{
      publication.followers.push(userId);
      return Commons.update(Publications,publication);
    });
};

PublicationInterface.removePublicationFollower = (publicationId, userId)=>{
  return Commons.getOne(Publications, publicationId)
    .then((publication)=>{
      publication.followers.splice(publication.followers.indexOf(userId),1);
      return Commons.update(Publications,publication);
    });
};

PublicationInterface.addPublicationImage = (publicationId, images)=>{
  return Commons.getOne(Publications, publicationId)
    .then((publication)=>{
      images.forEach((image)=>{
        publication.images.push({url:image});
      });
      return Commons.update(Publications,publication);
  });
};

PublicationInterface.deletePublicationImage = (publicationId, imageId)=>{
  const imageUploader = require('../services/imageUploader');
  return Commons.getOne(Publications, publicationId)
    .then((publication)=>{
      publication.images.forEach((image,i)=>{
        if(image._id==imageId){
          Commons.getOne(Users, publication.user)
            .then((user)=>{
              return imageUploader.removeFromGcs(user.bucketId,image.url).
              then(()=>{
                publication.images.splice(i,1);
                return Commons.update(Publications,publication);
              })
            });
        }
      });
    });
};

PublicationInterface.getPublicationImage = (publicationId, imageUrl)=>{
  return Commons.getOne(Publications, publicationId)
    .then((publication)=>{
      return new Promise((resolve, reject)=>{
        publication.images.forEach((image)=>{
          if(image.url==imageUrl){
            resolve(image);
          }
        });
        reject("can't found imageUrl");
      })
    })
};

module.exports = PublicationInterface;
