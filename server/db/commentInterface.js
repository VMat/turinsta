const Comments = require('../models/comment');
const Users = require('../models/user');
const Commons = require('./commons');
const UserInterface = require('./userInterface');

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
          return Commons.insert(new Comments(oComment));
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
