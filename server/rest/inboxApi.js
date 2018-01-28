const router = require('express').Router();
const inboxService = require('../services/inboxService');

router.get('/user/:user',(req, res)=>{
  inboxService.getInboxes(req.params.user)
    .then(inboxes=>{res.status(200).json(inboxes)})
    .catch(error=>{res.status(500).send(error)})
});

router.get('/:id',(req, res)=>{
  inboxService.getInbox(req.params.id)
    .then(inbox=>{res.status(200).json(inbox)})
    .catch(error=>{res.status(500).send(error)})
});

router.post('/',(req, res)=>{
  inboxService.createInbox(req.body)
    .then(inbox=>{res.status(200).json(inbox)})
    .catch(error=>{res.status(500).send(error)})
});

router.put('/',(req, res)=>{
  inboxService.updateInbox(req.body)
    .then(inbox=>{res.status(200).json(inbox)})
    .catch(error=>{res.status(500).send(error)})
});

router.delete('/:id',(req, res)=>{
  inboxService.deleteInbox(req.params.id)
    .then(inbox=>{res.status(200).json(inbox)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;
