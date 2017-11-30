let Commons = (function(){

  function oCommons(){}

  oCommons.prototype = {

    getAll: (Collection)=>{
      return Collection.find()
    },

    getN: (Collection,filters,n,order)=>{      
      return Collection.find(filters)
          .sort(order)
          .limit(Number(n));
    },

    getOne: (Collection,id)=>{
      return Collection.findById(id);
    },

    insert: (newPublication)=>{
      return newPublication.save();
    },

    update: (Collection,doc)=>{
      return Collection.findByIdAndUpdate(doc._id, doc, {upsert:false});
    },

    removeAll: (Collection)=>{
      return Collection.remove();
    },

    removeOne: (Collection,doc)=>{
      return Collection.findByIdAndRemove(doc._id);
    }

  };

  return oCommons;

})();

const oCommons = new Commons();

module.exports = oCommons;
