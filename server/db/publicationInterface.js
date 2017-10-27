const Publications = require('../models/publication');
const Commons = require('./commons');

var PublicationInterface = (function(){
  
  function oPublicationInterface(){};
  
  oPublicationInterface.prototype = {
    
    getAll: ()=>{
      return Publications.find();
    },
    
    getOne: (id)=>{
      return Publications.find({"uniqueCode": id}).exec();
    },
        
    insert: (publication)=>{
      return Commons.getNextUniqueCode(Publications,(nextUniqueCode)=>{
        let newPublication = new Publications(publication);
        newPublication.uniqueCode = nextUniqueCode;
        return newPublication.save();
      })
    },
    
    update: (id, publication)=>{
      
      //return Publications.findOneAndUpdate({'uniqueCode':id}, product, {upsert:false}, (err, updatedProduct)=>{updatedProduct});
      
      return Publications.find({"uniqueCode": id}).
        exec((err,publications)=>{
          if(publications.length > 0){
            publications[0].name = publication.name;
            publications[0].description = publication.description;
            publications[0].priceSince = publication.priceSince;
            return publications[0].save();            
          }
        });
    },
    
    deleteAll: ()=>{
      return Publications.remove();
    },
    
    deleteOne: (id)=>{
      return Publications.find({"uniqueCode": id}).
        exec((err,publications)=>{
          if(publications.length > 0){
            publications[0].remove((err,deletedPublication)=>{
              return deletedPublication;
            });
          }
        });
    }
    
  };

  return oPublicationInterface;

})();

oPublicationInterface = new PublicationInterface();

module.exports = oPublicationInterface;

