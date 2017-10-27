let Commons = (function(){

  function oCommons(){};
  
  oCommons.prototype = {
    
    getNextUniqueCode: (Collection,fn)=>{
      
      let nextUniqueCode = null;
      
      return Collection.find({}).
        limit(1).
        sort('-uniqueCode').
        select('uniqueCode').
        exec((err,doc)=>{
          if(doc.length>0){
            nextUniqueCode = doc[0].uniqueCode + 1;
          }
          else{
            nextUniqueCode = 1;
          }
        }).then(()=>{return fn(nextUniqueCode)});
    },
    
    getAll: (Collection)=>{
      return Collection.find()
    },
    
    getOne: (Collection,id)=>{
      console.log(id);
      return Collection.findById(id);
    }
  
  };
  
  return oCommons;

})();

const oCommons = new Commons();

module.exports = oCommons;
