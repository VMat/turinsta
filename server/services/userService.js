const storageService = require('./storageService');

let userService = {};
     
userService.getUsers = ()=>{
  return new Promise((resolve, reject)=>{
    storageService.getUsers().
      then(users=>resolve(users)).
      catch(error=>reject(error))        
  })                
};  
      
userService.getUser = (id,fields)=>{
  return new Promise((resolve, reject)=>{
    storageService.getUser(id,fields).
      then(users=>resolve(users)).
      catch(error=>reject(error))        
  })                
};
    
userService.createUser = (user)=>{
  return new Promise((resolve, reject)=>{
    storageService.createUser(user).
      then(newUser=>resolve(newUser)).
      catch(error=>reject(error)) 
  })
};
    
userService.updateUser = (user)=>{
  return new Promise((resolve, reject)=>{
    storageService.updateUser(user).
      then(updatedUser=>resolve(updatedUser)).
      catch(error=>reject(error))  
  })
};
    
userService.addFavoritePublication = (favorite)=>{
  return new Promise((resolve, reject)=>{
    storageService.addFavoritePublication(favorite).
      then(updatedUser=>resolve(updatedUser)).
      catch(error=>reject(error))  
  })    
};
    
userService.removeFavoritePublication = (favorite)=>{
  return new Promise((resolve, reject)=>{
    storageService.removeFavoritePublication(favorite).
      then(updatedUser=>resolve(updatedUser)).
      catch(error=>reject(error))  
  })   
};
    
userService.addUserFollower = (follower)=>{
  return new Promise((resolve, reject)=>{
    storageService.addUserFollower(follower).
      then(updatedUser=>resolve(updatedUser)).
      catch(error=>reject(error))  
  })    
};
    
userService.removeUserFollower = (follower)=>{
  return new Promise((resolve, reject)=>{
    storageService.removeUserFollower(follower).
      then(updatedUser=>resolve(updatedUser)).
      catch(error=>reject(error))  
  })   
};

userService.removeUnreadMessages = (userId,inboxId)=>{
  return new Promise((resolve, reject)=>{
    storageService.removeUnreadMessages(userId,inboxId).
      then(updatedUser=>resolve(updatedUser)).
      catch(error=>reject(error))
  })
};

module.exports = userService;
