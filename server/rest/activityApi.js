const router = require('express').Router();
const activityService = require('../services/activityService');

router.get('/user/:user/count/:count',(req, res)=>{
  activityService.getActivities(req.params.user,req.query,req.params.count)
    .then(activities=>{res.status(200).json(activities)})
    .catch(error=>{res.status(500).send(error)})
});

router.get('/:id',(req, res)=>{
  activityService.getActivity(req.params.id)
    .then(activity=>{res.status(200).json(activity)})
    .catch(error=>{res.status(500).send(error)})
});

router.post('/',(req, res)=>{
  activityService.createActivity(req.body)
    .then(activity=>{res.status(200).json(activity)})
    .catch(error=>{res.status(500).send(error)})
});

router.put('/',(req, res)=>{
  activityService.updateActivity(req.body)
    .then(activity=>{res.status(200).json(activity)})
    .catch(error=>{res.status(500).send(error)})
});

router.delete('/:id',(req, res)=>{
  activityService.deleteActivity(req.params.id)
    .then(activity=>{res.status(200).json(activity)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;
