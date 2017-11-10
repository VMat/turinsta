const router = require('express').Router();
const userService = require('../services/userService');
  
router.get('/',(req, res)=>{
  userService.getUsers()
    .then(users=>{res.status(200).json(users)})
    .catch(error=>{res.status(500).send(error)})
});
  
router.get('/:id',(req, res)=>{
  userService.getUser(req.params.id)
    .then(user=>{res.status(200).json(user)})
    .catch(error=>{res.status(500).send(error)})
});

router.post('/',(req, res)=>{
  userService.createUser(req.body)
    .then(user=>{res.status(200).json(user)})
    .catch(error=>{res.status(500).send(error)})
});

router.put('/',(req, res)=>{
  userService.updateUser(req.body)
    .then(user=>{res.status(200).json(user)})
    .catch(error=>{res.status(500).send(error)})
});

module.exports = router;