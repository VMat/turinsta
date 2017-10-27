var db = require('../db/mongo');

var storageService = (function(){

  function oStorageService(){};
  
  oStorageService.prototype = {
    
    connect: ()=>{
      db.connect();
    },
    
    getProducts: ()=>{
      return db.getProducts();
    },
    
    getProduct: (id)=>{
      return db.getProduct(id);
    },
    
    createProduct: (product)=>{
      return db.createProduct(product);
    },
    
    updateProduct: (id,product)=>{
      return db.updateProduct(id,product);
    },
    
    deleteProducts: ()=>{
      return db.deleteProducts();
    },
    
    deleteProduct: (id)=>{
      return db.deleteProduct(id);
    },
    
    getAccounts: ()=>{
      return db.getAccounts();
    },
   
    getAccount: (id)=>{
      return db.getAccount(id);
    },
    
    createAccount: (account)=>{
      return db.createAccount(account);
    },
    
    patchAccount: (id, account)=>{
      return db.patchAccount(id, account);
    },
    
    updateAccount: (id, account)=>{
      return db.updateAccount(id, account);
    },
    
    deleteAccounts: ()=>{
      return db.deleteAccounts();
    },
    
    deleteAccount: (id)=>{
      return db.deleteAccount(id);
    },
    
    getRequests: ()=>{
      return db.getRequests();
    },
    
    getRequest: (id)=>{
      return db.getRequest(id);
    },
    
    createRequest: (request)=>{
      return db.createRequest(request);
    },
    
    updateRequest: (id, request)=>{
      return db.updateRequest(id, request);
    },
    
    deleteRequests: ()=>{
      return db.deleteRequests();
    },
    
    deleteRequest: (id)=>{
      return db.deleteRequest(id);
    },
    
    getNews: ()=>{
      return db.getNews();
    },
   
    getNovelty: (id)=>{
      return db.getNovelty(id);
    },
    
    createNovelty: (novelty)=>{
      return db.createNovelty(novelty);
    },
    
    patchNovelty: (id, novelty)=>{
      return db.patchNovelty(id, novelty);
    },
    
    updateNovelty: (id, novelty)=>{
      return db.updateNovelty(id, novelty);
    },
    
    deleteNews: ()=>{
      return db.deleteNews();
    },
    
    deleteNovelty: (id)=>{
      return db.deleteNovelty(id);
    }
    
  };
  
  return oStorageService;

})();

var oStorageServiceb = new storageService();

module.exports = oStorageServiceb;
