const mongoose = require('mongoose');
const productInterface = require('./productInterface');

let db = (function(){

  function oDb(){}
      
  oDb.prototype = {
  
    connect: ()=>{
    
      mongoose.connect(process.env.MONGOLAB_URI, (error)=>{
        if (error) 
          console.error(error);
        else 
          console.log('mongo connected');
      });
    },
    
    getProducts: ()=>{
      return productInterface.getAll();
    },
    
    getProduct: (id)=>{
      return productInterface.getOne(id);
    },
        
    createProduct: (product)=>{
      return productInterface.insert(product);
    },
    
    updateProduct: (id, product)=>{
      return productInterface.update(id, product);
    },
    
    deleteProducts: ()=>{
      return productInterface.deleteAll();
    },
    
    deleteProduct: (id)=>{
      return productInterface.deleteOne(id);
    }     
  };
  
  return oDb;
})();

let oDb = new db();

module.exports = oDb;
