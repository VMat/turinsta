const router = require('express').Router();
const complaintService = require('../services/complaintService');

router.get('/',(req, res)=>{
  complaintService.getComplaints()
    .then(complaints=>{res.status(200).json(complaints)})
    .catch(error=>{res.status(500).send(error)})
});

router.get('/:id',(req, res)=>{
  complaintService.getComplaint(req.params.id)
    .then(complaint=>{res.status(200).json(complaint)})
    .catch(error=>{res.status(500).send(error)})
});

router.post('/',(req, res)=>{
  complaintService.createComplaint(req.body)
    .then(complaint=>{res.status(200).json(complaint)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;
