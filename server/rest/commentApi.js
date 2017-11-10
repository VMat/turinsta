const router = require('express').Router();
const commentService = require('../services/commentService');
  
router.get('/:id',(req, res)=>{
  commentService.getComment(req.params.id)
    .then(comment=>{res.status(200).json(comment)})
    .catch(error=>{res.status(500).send(error)})
});

router.post('/',(req, res)=>{
  commentService.createComment(req.body)
    .then(comment=>{res.status(200).json(comment)})
    .catch(error=>{res.status(500).send(error)})
});

router.put('/',(req, res)=>{
  commentService.updateComment(req.body)
    .then(comment=>{res.status(200).json(comment)})
    .catch(error=>{res.status(500).send(error)})
});

router.delete('/',(req, res)=>{
  commentService.deleteComment(req.body)
    .then(comment=>{res.status(200).json(comment)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;
