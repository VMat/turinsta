const Comments = require('../models/comment');
const Users = require('../models/user');
const Commons = require('./commons');

const CommentInterface = (function(){

  function oCommentInterface(){}

  oCommentInterface.prototype = {

    getOne: (id)=>{
      return Commons.getOne(Comments, id)        
        .populate('user')
        .populate('replies.user');
    },
    
    insert: (comment)=>{
      return Commons.insert(new Comments(comment));
    },

    update: (comment)=>{
      return Commons.update(Comments, comment);
    },

    deleteOne: (id)=>{
      return Commons.removeOne(Comments, id);
    }
  }

  return oCommentInterface;

})();

oCommentInterface = new CommentInterface();

module.exports = oCommentInterface;
