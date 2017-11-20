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
          oComment.parent = comment.parent;
          oComment.content = comment.content;
          return Commons.insert(new Comments(oComment))
            .then(insertedComment=>{
              if(comment.parent!=null){
                return Commons.getOne(Comments,comment.parent)
                .then(comment=>{
                  comment.replies.push({
                    id: insertedComment._id,
                    user: insertedComment.user,
                    date: insertedComment.date,
                    content: insertedComment.content
                  });
                  return Commons.update(Comments,comment)
                })
              }
              else{
                return PublicationInterface.getOne(insertedComment.publication)
                .then(publication=>{
                  publication.comments.push(insertedComment._id);
                  return PublicationInterface.update(publication)
                })
              }
          });
        });
    },

    update: (comment)=>{
      if(comment.parent != null){
        return Commons.getOne(Comments,comment.parent)
          .then(comment=>{
            comment.replies.filter((reply)=>{
              return reply.id == comment._id;
            })[0].content = insertedComment.content;

            return Commons.update(Comments,comment)
          })
      }
      return Commons.update(Comments, comment);
    },

    deleteOne: (id)=>{
      return Commons.getOne(Comments,id)
        .then(comment=>{
          return PublicationInterface.getOne(comment.publication)
            .then(publication=>{
              publication.comments.splice(publication.comments.indexOf(comment._id), 1);
              return PublicationInterface.update(publication)
                .then(()=>{
                  return Commons.removeOne(Comments, comment);
                })
            })
        })
    }
  };

  return oCommentInterface;

})();

oCommentInterface = new CommentInterface();

module.exports = oCommentInterface;
