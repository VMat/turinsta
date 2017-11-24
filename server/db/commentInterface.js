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
      if(Boolean(comment.id)){ // Si tiene la propiedad "id" es porque es una respuesta
        return Commons.getOne(Comments,comment.id)
          .then((originalComment)=>{
            return Commons.getOne(Comments,originalComment.parent)
              .then(parent=>{
                parent.replies.filter((reply)=>{
                  return reply.id.equals(originalComment._id);
                })[0].content = comment.content;

                return Commons.update(Comments,parent)
                  .then(()=>{
                    originalComment.content = comment.content;
                    return Commons.update(Comments, originalComment);
                  })
              })
          });
      }
      else{
        return Commons.update(Comments, comment);
      }
    },

    deleteOne: (id)=>{
      return Commons.getOne(Comments,id)
        .then(comment=>{
          if(comment.parent != null){
            return Commons.getOne(Comments,comment.parent)
              .then(parent=>{

                parent.replies.filter((reply,i)=>{
                  if(reply.id.equals(comment._id)){
                    parent.replies.splice(i,1);
                  }
                });

                return Commons.update(Comments,parent)
                  .then(()=>{
                    return Commons.removeOne(Comments, comment);
                  })
              });
          }
          else{
            console.log("comment id: " + id);
            return PublicationInterface.getOne(comment.publication)
              .then(publication=>{
                publication.comments.splice(publication.comments.indexOf(comment._id), 1);
                return PublicationInterface.update(publication)
                  .then(()=>{
                    return Commons.removeOne(Comments, comment);
                  })
              })
          }
        })
    }
  };

  return oCommentInterface;

})();

oCommentInterface = new CommentInterface();

module.exports = oCommentInterface;
