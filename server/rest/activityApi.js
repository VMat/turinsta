const router = require('express').Router();
const activityService = require('../services/activityService');
  
router.get('/',(req, res)=>{
  activityService.getActivities()
    .then(activities=>{res.status(200).json(activities)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;
