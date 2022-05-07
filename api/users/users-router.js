const express = require('express');
const {get,
getById,
getUserPosts,
insert,
update,
remove} = require('./users-model');
const {getPostsById, insertPost} = require('../posts/posts-model');
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  get()
  .then(users => res.status(200).json(users))
  .catch(() => res.status(500).json({message: "The users data could not be retrieved"}))
  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user);

});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  insert(req.body)
  .then(user => res.status(201).json(user))
  .catch(() => res.status(500).json({message: "failed to create new user"}))
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user, req.body)
  update(req.params.id, req.body)
  .then(update => res.status(200).json(update))
  .catch( () => res.status(500).json({message: "failed to update user"}))
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  remove(req.params.id)
  .then(() => res.status(200).json(req.user))
  .catch(() => res.status(500).json({message: "failed to remove user"}))
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  getUserPosts(req.params.id)
  .then(posts => res.status(200).json(posts))
  .catch(() => res.status(500).json({message: "failed to get user posts"}))
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  insertPost({"user_id": req.params.id, text: req.body.text})
  .then(confirm => res.status(200).json(confirm))
  .catch(() => res.status(500).json({id: 111, text: req.body.text}))
});

// do not forget to export the router
module.exports = router;