const Comments = require('../models/comment');
const Users = require('../models/user');
const Publications = require('../models/publication');
const Commons = require('./commons');
const UserInterface = require('./userInterface');

let CommentInterface = {};

CommentInterface.getOne = (id)=>{
  return Commons.getOne(Comments, id);
};

CommentInterface.insert = (comment)=>{
  return UserInterface.getOne(comment.user)
    .then(user=>{
      let oComment = {};
      oComment.user = {
        _id: user._id,
        username: user.username,
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
                _id: insertedComment._id,
                user: insertedComment.user,
                date: insertedComment.date,
                content: insertedComment.content
              });
              return Commons.update(Comments,comment)
            })
          }
          else{
            const PublicationInterface = require('./publicationInterface');
            return Commons.getOne(Publications,insertedComment.publication)
            .then(publication=>{
              publication.commentIds.push(insertedComment._id);
              return PublicationInterface.update(publication)
            })
          }
      });
    });
};

CommentInterface.update = (comment)=>{
  if(Boolean(comment.parent)){
    return Commons.getOne(Comments,comment.parent)
      .then(parent=>{
        parent.replies.filter((reply)=>{
          return reply._id.equals(comment._id);
        })[0].content = comment.content;
        return Commons.update(Comments,parent)
          .then(()=>{
            return Commons.update(Comments, comment);
          })
      });
  }
  else{
    return Commons.update(Comments, comment);
  }
};

CommentInterface.deleteOne = (id)=>{
  return Commons.getOne(Comments,id)
    .then(comment=>{
      if(comment.parent != null){
        return Commons.getOne(Comments,comment.parent)
          .then(parent=>{
            parent.replies.filter((reply,i)=>{
              if(reply._id.equals(comment._id)){
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
        return Commons.getOne(Publications, comment.publication)
          .then(publication=>{
            const PublicationInterface = require('./publicationInterface');
            publication.commentIds.splice(publication.commentIds.indexOf(comment._id), 1);
            return PublicationInterface.update(publication)
              .then(()=>{
                return Commons.removeOne(Comments, comment);
              })
          })
      }
    })
};
    
CommentInterface.deleteFromPublication = (id)=>{
  return Commons.removeWithFilter(Comments,{"publication": id});
};
    
module.exports = CommentInterface;
