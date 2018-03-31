const storageService = require('./storageService');

let complaintService = {};

complaintService.getComplaints = ()=>{
  return new Promise((resolve, reject)=>{
    storageService.getComplaints().
    then(complaints=>resolve(complaints)).
    catch(error=>reject(error))
  })
};

complaintService.getComplaint = (id)=>{
  return new Promise((resolve, reject)=>{
    storageService.getComplaint(id).
    then(complaint=>resolve(complaint)).
    catch(error=>reject(error))
  })
};

complaintService.createComplaint = (newComplaint)=>{
  return new Promise((resolve, reject)=>{
    storageService.createComplaint(newComplaint).
    then(complaint=>resolve(complaint)).
    catch(error=>reject(error))
  })
};

module.exports = complaintService;
