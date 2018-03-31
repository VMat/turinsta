const Complaints = require('../models/complaint');
const Publications = require('../models/publication');
const Users = require('../models/user');
const Commons = require('./commons');

let ComplaintInterface = {};

ComplaintInterface.getAll = (filters)=>{
  return Commons.getN(Complaints,filters)
    .populate('reporter')
    .populate('reported')
    .populate('publication');
};

ComplaintInterface.getOne = (id)=>{
  return Commons.getOne(Complaints, id)
    .populate('reporter')
    .populate('reported')
    .populate('publication');
};

ComplaintInterface.insert = (complaint)=>{
  return Commons.insert(new Complaints(complaint));
};

module.exports = ComplaintInterface;
