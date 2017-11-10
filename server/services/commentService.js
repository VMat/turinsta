const storageService = require('./storageService');

const commentService = (function(){

  function oCommentService(){}
  
  oCommentService.prototype = {
      
    getComment: (id)=>{
      return new Promise((resolve, reject)=>{
        storageService.getComment(id).
          then(comments=>resolve(comments)).
          catch(error=>reject(error))        
      })                
    },
    
    createComment: (comment)=>{
      return new Promise((resolve, reject)=>{
        storageService.createComment(comment).
          then(newComment=>resolve(newComment)).
          catch(error=>reject(error)) 
      })
    },
    
    updateComment: (comment)=>{
      return new Promise((resolve, reject)=>{
        storageService.updateComment(comment).
          then(updatedComment=>resolve(updatedComment)).
          catch(error=>reject(error))  
      })
    },
    
    deleteComment: (comment)=>{
      return new Promise((resolve, reject)=>{
      storageService.deleteComment(comment).
        then(deletedComment=>resolve(deletedComment)).
        catch(error=>reject(error))  
      })
    }
  };

  return oCommentService;

})();

const oCommentService = new commentService();

module.exports = oCommentService;
