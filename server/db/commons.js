let Commons = (function(){

  function oCommons(){}

  oCommons.prototype = {

    getAll: (Collection)=>{
      return Collection.find()
    },

    getN: (Collection,n)=>{
      console.log("count: " + n);
      return Collection
        .find({})
        // .sort({'timestamps.created': -1})
        // .limit(Number(n))
        .exec();
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
