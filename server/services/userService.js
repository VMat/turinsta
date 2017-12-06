const storageService = require('./storageService');

const userService = (function(){

  function oUserService(){}
  
  oUserService.prototype = {
      
    getUsers: ()=>{
      return new Promise((resolve, reject)=>{
        storageService.getUsers().
          then(users=>resolve(users)).
          catch(error=>reject(error))        
      })                
    },  
      
    getUser: (id)=>{
      return new Promise((resolve, reject)=>{
        storageService.getUser(id).
          then(users=>resolve(users)).
          catch(error=>reject(error))        
      })                
    },
    
    createUser: (user)=>{
      return new Promise((resolve, reject)=>{
        storageService.createUser(user).
          then(newUser=>resolve(newUser)).
          catch(error=>reject(error)) 
      })
    },
    
    updateUser: (user)=>{
      return new Promise((resolve, reject)=>{
        storageService.updateUser(user).
          then(updatedUser=>resolve(updatedUser)).
          catch(error=>reject(error))  
      })
    },
    
    addFavoritePublication: (favorite)=>{
      return new Promise((resolve, reject)=>{
        storageService.addFavoritePublication(favorite).
          then(updatedUser=>resolve(updatedUser)).
          catch(error=>reject(error))  
      })    
    },
    
    removeFavoritePublication: (favorite)=>{
      return new Promise((resolve, reject)=>{
        storageService.removeFavoritePublication(favorite).
          then(updatedUser=>resolve(updatedUser)).
          catch(error=>reject(error))  
      })   
    }
    
  };

  return oUserService;

})();

const oUserService = new userService();

module.exports = oUserService;
