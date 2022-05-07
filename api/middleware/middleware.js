const {getById} = require('../users/users-model');

function logger (req, res, next) {
  // DO YOUR MAGIC
  const timestamp = Date.now();
  const {method, url} = req;
  console.log(method, url, timestamp);
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  getById(req.params.id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({message: "user not found"})
    }
  })
  .catch(err => console.error(err))
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const {name} = req.body;
  if (!name) {
    res.status(400).json({message: "missing required name field"})
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const {text} = req.body;
  if (!text) {
    res.status(400).json({message: "missing required text field"})
  } else {
    next();
  }

}

// do not forget to expose these functions to other modules
module.exports = {logger, validateUserId, validateUser, validatePost}