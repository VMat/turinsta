const mongoose = require('mongoose');

let Commons = {};

Commons.getAll = (Collection)=>{
  return Collection.find()
};

Commons.getN = (Collection,filters,n,order={"_id":1})=>{
  return Collection.find(filters)
      .sort(order)
      .limit(Number(n));
};

Commons.getOne = (Collection,id,fields={})=>{
  for(let key in fields){
    fields[key] = Number(fields[key]);
  }
  return Collection.findById(id).select(fields);
};

Commons.insert = (newPublication)=>{
  return newPublication.save();
};

Commons.patch = (Collection,id,fields)=>{
  return Collection.findByIdAndUpdate(id,{$set: fields});
};

Commons.update = (Collection,doc)=>{
  return Collection.findByIdAndUpdate(doc._id, doc, {upsert:false});
};

Commons.removeAll = (Collection)=>{
  return Collection.remove();
};

Commons.removeWithFilter = (Collection,filter)=>{
  return Collection.remove(filter);
};

Commons.removeOne = (Collection,doc)=>{
  return Collection.findByIdAndRemove(doc._id);
};

Commons.processParams = (params) => {
  let filters = [];

  for(let i in params){

    switch(params[i].operation){

      case 'EQUAL':{
        filters[i] = params[i].value;
        break;
      }
      case 'LIKE':{
        filters[i] = {"$regex": params[i].value, "$options": "i"};
        break;
      }
      case 'HIGHER_THAN':{
        filters[i] = { $gt: params[i].value };
        break;
      }
      case 'LOWER_THAN':{
        filters[i] = { $lt: params[i].value };
        break;
      }
      case 'BETWEEN':{
        filters[i] = { $gt: params[i].value[0], $lt: params[i].value[1] };
        break;
      }
      case 'IN':{
        filters[i] = {$in: params[i].value};
        break;
      }
    }
  }

  console.log("filters: " + JSON.stringify(filters));

  return filters;
};

Commons.processAggregateParams = (params) => {
  let filters = [];

  for(let i in params){

    switch(params[i].operation){

        case 'EQUAL':{
          filters.push({$match: {[i]: params[i].value}});
          break;
        }
        case 'LIKE':{
          filters.push({$match: {[i]: {$regex: params[i].value, $options: "i"}}});
          break;
        }
        case 'HIGHER_THAN':{
          filters.push({$match: {[i]: {$gt: params[i].value}}});
          break;
        }
        case 'LOWER_THAN':{
          filters.push({$match: {[i]: {$lt: params[i].value}}});
          break;
        }
        case 'BETWEEN':{
          filters.push({$match: {[i]: {$gt: params[i].value[0], $lt: params[i].value[1]}}});
          break;
        }
        case 'IN':{
          filters.push({$match: {[i]: {$in: params[i].value}}});
          break;
        }
        case 'CONTAINS':{
          filters.push({$match: {[i]: {$elemMatch: {$eq: params[i].value}}}});
          break;
        }
    }
  }

  return filters;
};

module.exports = Commons;
