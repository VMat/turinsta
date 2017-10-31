let Commons = (function(){

  function oCommons(){}

  oCommons.prototype = {

    getAll: (Collection)=>{
      return Collection.find()
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

    removeOne: (Collection,id)=>{
      return Collection.findByIdAndRemove(id);
    }

  };

  return oCommons;

})();

const oCommons = new Commons();

module.exports = oCommons;
