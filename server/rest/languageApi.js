const router = require('express').Router();
const languageService = require('../services/languageService');
  
router.get('/',(req, res)=>{
  languageService.getLanguages()
    .then(languages=>{res.status(200).json(languages)})
    .catch(error=>{res.status(500).send(error)})
});

router.get('/:id',(req, res)=>{
  languageService.getLanguage(req.params.id)
    .then(language=>{res.status(200).json(language)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;
