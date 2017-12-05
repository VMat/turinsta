const router = require('express').Router();
const experienceService = require('../services/experienceService');

router.get('/:id',(req, res)=>{
  experienceService.getExperience(req.params.id)
    .then(experience=>{res.status(200).json(experience)})
    .catch(error=>{res.status(500).send(error)})
});

router.post('/',(req, res)=>{
  experienceService.createExperience(req.body)
    .then(experience=>{res.status(200).json(experience)})
    .catch(error=>{res.status(500).send(error)})
});

router.put('/',(req, res)=>{
  experienceService.updateExperience(req.body)
    .then(experience=>{res.status(200).json(experience)})
    .catch(error=>{res.status(500).send(error)})
});

router.delete('/:id',(req, res)=>{
  experienceService.deleteExperience(req.params.id)
    .then(experience=>{res.status(200).json(experience)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;
