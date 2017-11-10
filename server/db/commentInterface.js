const Comments = require('../models/comment');
const Users = require('../models/user');
const Commons = require('./commons');
const UserInterface = require('./userInterface');
const PublicationInterface = require('./publicationInterface');

const CommentInterface = (function(){

  function oCommentInterface(){}

  oCommentInterface.prototype = {

    getOne: (id)=>{
      return Commons.getOne(Comments, id);
    },

    insert: (comment)=>{
      return UserInterface.getOne(comment.user)
        .then(user=>{
          let oComment = {};
          oComment.user = {
            id: user._id,
            name: user.username,
            avatar: user.avatar
          };
          oComment.publication = comment.publication;
          oComment.content = comment.content;
          Commons.insert(new Comments(oComment))
            .then(comment=>{
              console.log("new comment" + comment._id);
              PublicationInterface.getOne(comment.publication)
              .then(publication=>{
                console.log("get publication" + publication._id);
                publication.comments.push(comment._id);
                PublicationInterface.update(publication)
              })
            });
        });
    },

    update: (comment)=>{
      return Commons.update(Comments, comment);
    },

    deleteOne: (id)=>{
      return Commons.removeOne(Comments, id);
    }
  };

  return oCommentInterface;

})();

oCommentInterface = new CommentInterface();

module.exports = oCommentInterface;
