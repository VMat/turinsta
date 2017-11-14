const router = require('express').Router();
const activityService = require('../services/activityService');
  
router.get('/',(req, res)=>{
  activityService.getActivities()
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

router.delete('/',(req, res)=>{
  activityService.deleteActivity(req.body)
    .then(activity=>{res.status(200).json(activity)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;
