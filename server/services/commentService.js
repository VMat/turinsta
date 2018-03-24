const storageService = require('./storageService');

let commentService = {};

commentService.getComment = (id)=>{
  return new Promise((resolve, reject)=>{
    storageService.getComment(id).
      then(comments=>resolve(comments)).
      catch(error=>reject(error))
  })
};

commentService.createComment = (comment)=>{
  return new Promise((resolve, reject)=>{
    storageService.createComment(comment).
      then(newComment=>resolve(newComment)).
      catch(error=>reject(error))
  })
};

commentService.updateComment = (comment)=>{
  return new Promise((resolve, reject)=>{
    storageService.updateComment(comment).
      then(updatedComment=>resolve(updatedComment)).
      catch(error=>reject(error))
  })
};

commentService.deleteComment = (user,id)=>{
  return new Promise((resolve, reject)=>{
  storageService.deleteComment(user,id).
    then(deletedComment=>resolve(deletedComment)).
    catch(error=>reject(error))
  })
};

module.exports = commentService;
