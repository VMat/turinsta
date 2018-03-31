const router = require('express').Router();
const userService = require('../services/userService');
const Multer = require('multer');
const imageUploader = require('../services/imageUploader');

const uploadHandler = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
});

router.get('/',(req, res)=>{
  userService.getUsers()
    .then(users=>{res.status(200).json(users)})
    .catch(error=>{res.status(500).send(error)})
});

router.get('/:id',(req, res)=>{
  console.log("GET USER --> REQ.QUERY: " + JSON.stringify(req.query));
  //let rowSearchParams = JSON.parse(decodeURI(JSON.stringify(req.query)));
  //let searchParams = {};
  //for(let i in rowSearchParams){
  //  searchParams[i] = JSON.parse(rowSearchParams[i]);
  //}
  //console.log(JSON.stringify(searchParams));
  userService.getUser(req.params.id,req.query)
    .then(user=>{res.status(200).json(user)})
    .catch(error=>{res.status(500).send(error)})
});

router.get('/:id/followedes/count/:limit',(req, res)=>{
  userService.getFollowedes(req.params.id,req.params.limit)
    .then(user=>{res.status(200).json(user)})
    .catch(error=>{res.status(500).send(error)})
});

router.get('/:id/favorites/count/:limit',(req, res)=>{
  userService.getFavorites(req.params.id,req.params.limit)
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

router.patch('/:id',(req, res)=>{
  userService.patchUser(req.params.id, req.body)
    .then(user=>{res.status(200).json(user)})
    .catch(error=>{res.status(500).send(error)})
});

router.post('/favorites',(req, res)=>{
  userService.addFavoritePublication(req.body)
    .then(user=>{res.status(200).json(user)})
    .catch(error=>{res.status(500).send(error)})
});

router.delete('/favorites/user/:user/publication/:publication',(req, res)=>{
  userService.removeFavoritePublication({user: req.params.user, publication: req.params.publication})
    .then(user=>{res.status(200).json(user)})
    .catch(error=>{res.status(500).send(error)})
});

router.post('/followers',(req, res)=>{
  userService.addUserFollower(req.body)
    .then(user=>{res.status(200).json(user)})
    .catch(error=>{res.status(500).send(error)})
});

router.delete('/followers/:followed/:follower',(req, res)=>{
  userService.removeUserFollower({followed: req.params.followed, follower: req.params.follower})
    .then(user=>{res.status(200).json(user)})
    .catch(error=>{res.status(500).send(error)})
});

router.delete('/:user/inbox/:inbox',(req, res)=>{
  userService.removeUnreadMessages(req.params.user, req.params.inbox)
    .then(user=>{res.status(200).json(user)})
    .catch(error=>{res.status(500).send(error)})
});

router.post('/:user/avatar',uploadHandler.any(),imageUploader.genericUploadToGcs,(request, response)=>{
  const cloudStoragePublicUrls = request.files.map((file)=>{return file.cloudStoragePublicUrl});
  if(cloudStoragePublicUrls){
    if(cloudStoragePublicUrls.length>0){
      console.log(cloudStoragePublicUrls[0]);
      response.status(200).json(cloudStoragePublicUrls[0])
    }
    else{
      response.status(500).send("error")
    }
  }
  else{
    response.status(500).send("error")
  }
});


module.exports = router;
