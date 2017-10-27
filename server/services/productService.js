const storageService = require('./storageService');

const productService = (function(){

  function oProductService(){}
  
  oProductService.prototype = {
  
    getProducts: ()=>{      
      return new Promise((resolve, reject)=>{
        storageService.getProducts().
          then(products=>resolve(products)).
          catch(error=>reject(error))        
      })
    },
    
    getProduct: (id)=>{
      return new Promise((resolve, reject)=>{
        storageService.getProduct(id).
          then(products=>resolve(products)).
          catch(error=>reject(error))        
      })                
    },
    
    createProduct: (product)=>{
      return new Promise((resolve, reject)=>{
        storageService.createProduct(product).
          then(newProduct=>resolve(newProduct)).
          catch(error=>reject(error)) 
      })
    },
    
    updateProduct: (id,product)=>{
      return new Promise((resolve, reject)=>{
        storageService.updateProduct(id,product).
          then(updatedProduct=>resolve(updatedProduct)).
          catch(error=>reject(error))  
      })
    },
    
    deleteProducts: ()=>{
      return new Promise((resolve, reject)=>{
        storageService.deleteProducts().
          then(deletedProducts=>resolve(deletedProducts)).
          catch(error=>reject(error))  
      })
    },
    
    deleteProduct: (id)=>{
      return new Promise((resolve, reject)=>{
      storageService.deleteProduct(id).
        then(deletedProduct=>resolve(deletedProduct)).
        catch(error=>reject(error))  
      })
    }
  };

  return oProductService;

})();

const oProductService = new productService();

module.exports = oProductService;
